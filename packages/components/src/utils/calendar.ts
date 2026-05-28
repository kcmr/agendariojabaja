export interface CalendarEvent {
  id: string | number;
  title: string;
  date: string;
  time?: string;
  href: string;
  status?: "upcoming" | "past";
  location?: string;
  category?: string;
}

export interface CalendarDay {
  date: Date;
  isoDate: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const toIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const toIsoMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

export const parseIsoMonth = (value?: string) => {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) return undefined;

  const [year, month] = value.split("-").map(Number);
  const date = new Date(year, month - 1, 1);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1) {
    return undefined;
  }

  return date;
};

export const parseIsoDate = (value: string) => {
  if (!ISO_DATE_PATTERN.test(value)) return undefined;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

  return date;
};

export const addMonths = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);

export const resolveInitialMonth = (
  initialMonth: string | undefined,
  events: readonly CalendarEvent[],
  fallbackDate = new Date()
) => {
  const parsedMonth = parseIsoMonth(initialMonth);
  if (parsedMonth) return parsedMonth;

  const firstEventDate = events
    .map((event) => parseIsoDate(event.date))
    .find((date): date is Date => Boolean(date));

  return firstEventDate
    ? new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1)
    : new Date(fallbackDate.getFullYear(), fallbackDate.getMonth(), 1);
};

export const groupEventsByIsoDate = <TEvent extends CalendarEvent>(
  events: readonly TEvent[]
) =>
  events.reduce<Record<string, TEvent[]>>((groupedEvents, event) => {
    if (!parseIsoDate(event.date)) return groupedEvents;

    groupedEvents[event.date] ??= [];
    groupedEvents[event.date].push(event);

    return groupedEvents;
  }, {});

export const getMonthCalendarDays = <TEvent extends CalendarEvent>(
  monthDate: Date,
  events: readonly TEvent[]
): CalendarDay[] => {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const mondayOffset = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - mondayOffset);

  const groupedEvents = groupEventsByIsoDate(events);
  const days: CalendarDay[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const isoDate = toIsoDate(date);

    days.push({
      date,
      isoDate,
      dayOfMonth: date.getDate(),
      isCurrentMonth: date.getMonth() === monthStart.getMonth(),
      events: groupedEvents[isoDate] ?? [],
    });
  }

  return days;
};

export const getEventsInMonth = <TEvent extends CalendarEvent>(
  events: readonly TEvent[],
  monthDate: Date
) =>
  events.filter((event) => {
    const date = parseIsoDate(event.date);
    return (
      date &&
      date.getFullYear() === monthDate.getFullYear() &&
      date.getMonth() === monthDate.getMonth()
    );
  });
