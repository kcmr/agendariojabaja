import type { Tables } from "../../database.types";
import { createServerSupabaseClient } from "./supabase";

type EventRow = Tables<"events">;
type EventStatus = NonNullable<EventRow["status"]>;
type PublicEventRow = Pick<
  EventRow,
  | "id"
  | "name"
  | "neutral_description"
  | "description"
  | "date"
  | "time"
  | "location"
  | "category"
  | "price"
  | "image_url"
  | "link"
  | "publisher"
  | "source_type"
  | "status"
  | "publish_on_web"
>;

export type WebEventStatus = "upcoming" | "past";

export interface WebEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  category?: string;
  price?: string;
  image?: {
    src: string;
    alt: string;
  };
  sourceUrl?: string;
  sourceName?: string;
  status: WebEventStatus;
}

const EXCLUDED_PUBLIC_EVENT_STATUSES = new Set<EventStatus>([
  "Descartado",
  "Revisión",
]);
const EMPTY_VALUE_LABELS = new Set([
  "",
  "no especificado",
  "no especificada",
  "sin especificar",
  "n/a",
]);
const EVENT_DETAIL_PAST_DAYS = 60;
const EVENT_SELECT_FIELDS =
  "id,name,neutral_description,description,date,time,location,category,price,image_url,link,publisher,source_type,status,publish_on_web";

type EventDateRange = {
  start: Date;
  end: Date;
};

const cleanOptionalText = (value: string | null): string | undefined => {
  if (!value) return undefined;

  const trimmed = value.trim();
  const normalized = trimmed
    .toLowerCase()
    .replace(/[.,;:!?¿¡]+$/g, "")
    .replace(/\s+/g, " ");

  return EMPTY_VALUE_LABELS.has(normalized) ? undefined : trimmed;
};

const getWebDescription = (value: string | null): string | undefined =>
  cleanOptionalText(value);

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const shortId = (id: string): string => id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);

export const createEventSlug = (
  event: Pick<PublicEventRow, "id" | "name">
): string => {
  const titlePart = slugify(event.name ?? "evento");
  const idPart = shortId(event.id);

  return idPart ? `${titlePart}-${idPart}` : titlePart;
};

const parseDate = (value: string | null): Date | undefined => {
  if (!value) return undefined;

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getUpcomingEventDateRange = (now: Date): EventDateRange => {
  const start = startOfDay(now);

  return {
    start,
    end: addMonths(start, 2),
  };
};

const getStaticEventDetailDateRange = (now: Date): EventDateRange => {
  const today = startOfDay(now);

  return {
    start: addDays(today, -EVENT_DETAIL_PAST_DAYS),
    end: addMonths(today, 2),
  };
};

const getCalendarEventDateRange = (now: Date): EventDateRange => {
  const today = startOfDay(now);

  return {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: addMonths(today, 2),
  };
};

export const mapEventRowToWebEvent = (
  row: PublicEventRow,
  options: {
    now?: Date;
    dateRange?: EventDateRange;
  } = {}
): WebEvent | undefined => {
  const now = options.now ?? new Date();
  if (!row.name || !row.date || !row.status) return undefined;
  if (row.publish_on_web === false) return undefined;

  const description = getWebDescription(row.neutral_description);
  if (!description) return undefined;

  if (EXCLUDED_PUBLIC_EVENT_STATUSES.has(row.status)) {
    return undefined;
  }

  const eventDate = parseDate(row.date);
  if (!eventDate) return undefined;

  const dateRange = options.dateRange ?? getUpcomingEventDateRange(now);

  if (eventDate < dateRange.start || eventDate > dateRange.end) {
    return undefined;
  }

  return {
    id: row.id,
    slug: createEventSlug(row),
    title: row.name,
    description,
    date: row.date,
    time: cleanOptionalText(row.time),
    location: cleanOptionalText(row.location),
    category: cleanOptionalText(row.category),
    price: cleanOptionalText(row.price),
    image: row.image_url
      ? {
          src: row.image_url,
          alt: row.name,
        }
      : undefined,
    sourceUrl: cleanOptionalText(row.link),
    sourceName: cleanOptionalText(row.publisher) ?? cleanOptionalText(row.source_type),
    status: eventDate < startOfDay(now) ? "past" : "upcoming",
  };
};

let upcomingEventsPromise: Promise<WebEvent[]> | undefined;
let calendarEventsPromise: Promise<WebEvent[]> | undefined;
let staticEventDetailEventsPromise: Promise<WebEvent[]> | undefined;

const fetchEventsInDateRange = async (
  dateRange: EventDateRange,
  now: Date,
  errorContext: string
): Promise<WebEvent[]> => {
  const client = createServerSupabaseClient();

  const { data, error } = await client
    .from("events")
    .select(EVENT_SELECT_FIELDS)
    .eq("publish_on_web", true)
    .gte("date", formatDateValue(dateRange.start))
    .lte("date", formatDateValue(dateRange.end))
    .order("date", { ascending: true });

  if (error) {
    throw new Error(`Could not fetch ${errorContext}: ${error.message}`);
  }

  return (data ?? [])
    .map((row) => mapEventRowToWebEvent(row, { now, dateRange }))
    .filter((event): event is WebEvent => Boolean(event));
};

const fetchUpcomingEvents = async (): Promise<WebEvent[]> => {
  const now = new Date();

  return fetchEventsInDateRange(
    getUpcomingEventDateRange(now),
    now,
    "upcoming events"
  );
};

const fetchStaticEventDetailEvents = async (): Promise<WebEvent[]> => {
  const now = new Date();

  return fetchEventsInDateRange(
    getStaticEventDetailDateRange(now),
    now,
    "static event detail events"
  );
};

const fetchCalendarEvents = async (): Promise<WebEvent[]> => {
  const now = new Date();

  return fetchEventsInDateRange(
    getCalendarEventDateRange(now),
    now,
    "calendar events"
  );
};

export const getUpcomingEvents = async (): Promise<WebEvent[]> => {
  upcomingEventsPromise ??= fetchUpcomingEvents();
  return upcomingEventsPromise;
};

export const getCalendarEvents = async (): Promise<WebEvent[]> => {
  calendarEventsPromise ??= fetchCalendarEvents();
  return calendarEventsPromise;
};

export const getStaticEventDetailEvents = async (): Promise<WebEvent[]> => {
  staticEventDetailEventsPromise ??= fetchStaticEventDetailEvents();
  return staticEventDetailEventsPromise;
};

export const getStaticEventDetailBySlug = async (
  slug: string
): Promise<WebEvent | undefined> => {
  const events = await getStaticEventDetailEvents();
  return events.find((event) => event.slug === slug);
};
