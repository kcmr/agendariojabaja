import type { Tables } from "../../database.types";
import { createServerSupabaseClient } from "./supabase";
import { getServerEnv } from "./env";

type EventRow = Tables<"events">;
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

const PUBLIC_EVENT_STATUSES = ["Publicado", "Caducado"] as const;

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

const isWithinExpiredRetention = (
  eventDate: Date,
  retentionDays: number,
  now = new Date()
): boolean => {
  const retentionMs = retentionDays * 24 * 60 * 60 * 1000;
  const cutoff = new Date(startOfDay(now).getTime() - retentionMs);

  return eventDate >= cutoff;
};

export const mapEventRowToWebEvent = (
  row: PublicEventRow,
  retentionDays = getServerEnv().eventArchiveRetentionDays,
  now = new Date()
): WebEvent | undefined => {
  if (!row.name || !row.date || !row.status) return undefined;
  if (!PUBLIC_EVENT_STATUSES.includes(row.status as (typeof PUBLIC_EVENT_STATUSES)[number])) {
    return undefined;
  }

  const eventDate = parseDate(row.date);
  if (!eventDate) return undefined;

  const status: WebEventStatus =
    row.status === "Caducado" || eventDate < startOfDay(now)
      ? "past"
      : "upcoming";

  if (status === "past" && !isWithinExpiredRetention(eventDate, retentionDays, now)) {
    return undefined;
  }

  return {
    id: row.id,
    slug: createEventSlug(row),
    title: row.name,
    description: row.neutral_description ?? row.description ?? "",
    date: row.date,
    time: row.time ?? undefined,
    location: row.location ?? undefined,
    category: row.category ?? undefined,
    price: row.price ?? undefined,
    image: row.image_url
      ? {
          src: row.image_url,
          alt: row.name,
        }
      : undefined,
    sourceUrl: row.link ?? undefined,
    sourceName: row.publisher ?? row.source_type ?? undefined,
    status,
  };
};

export const getPublicEvents = async (): Promise<WebEvent[]> => {
  const client = createServerSupabaseClient();
  const { eventArchiveRetentionDays } = getServerEnv();

  const { data, error } = await client
    .from("events")
    .select(
      "id,name,neutral_description,description,date,time,location,category,price,image_url,link,publisher,source_type,status"
    )
    .in("status", [...PUBLIC_EVENT_STATUSES])
    .order("date", { ascending: true });

  if (error) {
    throw new Error(`Could not fetch public events: ${error.message}`);
  }

  return (data ?? [])
    .map((row) => mapEventRowToWebEvent(row, eventArchiveRetentionDays))
    .filter((event): event is WebEvent => Boolean(event));
};

export const getPublicEventBySlug = async (
  slug: string
): Promise<WebEvent | undefined> => {
  const events = await getPublicEvents();
  return events.find((event) => event.slug === slug);
};
