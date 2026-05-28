import { describe, expect, it } from "vitest";
import {
  getEventsInMonth,
  getMonthCalendarDays,
  groupEventsByIsoDate,
  resolveInitialMonth,
  toIsoDate,
  toIsoMonth,
  type CalendarEvent,
} from "./calendar";

const events = [
  {
    id: "1",
    title: "Cata de vinos",
    date: "2026-04-24",
    href: "/eventos/cata/",
  },
  {
    id: "2",
    title: "Concierto",
    date: "2026-04-24",
    href: "/eventos/concierto/",
  },
  {
    id: "3",
    title: "Mercado",
    date: "2026-05-01",
    href: "/eventos/mercado/",
  },
] satisfies CalendarEvent[];

describe("calendar utilities", () => {
  it("generates month days starting on Monday", () => {
    const days = getMonthCalendarDays(new Date(2026, 3, 1), events);

    expect(days).toHaveLength(42);
    expect(toIsoDate(days[0].date)).toBe("2026-03-30");
    expect(days[0].date.getDay()).toBe(1);
  });

  it("handles leap-year February", () => {
    const days = getMonthCalendarDays(new Date(2024, 1, 1), []);
    const currentMonthDays = days.filter((day) => day.isCurrentMonth);

    expect(currentMonthDays).toHaveLength(29);
    expect(currentMonthDays.at(-1)?.isoDate).toBe("2024-02-29");
  });

  it("groups events by ISO date", () => {
    const groupedEvents = groupEventsByIsoDate(events);

    expect(groupedEvents["2026-04-24"]).toHaveLength(2);
    expect(groupedEvents["2026-05-01"]).toHaveLength(1);
  });

  it("filters events outside the visible month", () => {
    const aprilEvents = getEventsInMonth(events, new Date(2026, 3, 1));

    expect(aprilEvents.map((event) => event.id)).toEqual(["1", "2"]);
  });

  it("resolves the initial month from props or the first event", () => {
    expect(toIsoMonth(resolveInitialMonth("2026-06", events))).toBe("2026-06");
    expect(toIsoMonth(resolveInitialMonth(undefined, events))).toBe("2026-04");
    expect(
      toIsoMonth(resolveInitialMonth(undefined, [], new Date(2026, 8, 20)))
    ).toBe("2026-09");
  });
});
