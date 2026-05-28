<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../ui/Button.vue";
import Icon from "../ui/Icon.vue";
import EmptyState from "./EmptyState.vue";
import {
  addMonths,
  getMonthCalendarDays,
  resolveInitialMonth,
  toIsoMonth,
  type CalendarEvent,
} from "../../utils/calendar";

const props = withDefaults(
  defineProps<{
    events: readonly CalendarEvent[];
    initialMonth?: string;
    locale?: string;
    previousLabel?: string;
    nextLabel?: string;
  }>(),
  {
    initialMonth: undefined,
    locale: "es-ES",
    previousLabel: "Mes anterior",
    nextLabel: "Mes siguiente",
  }
);

const WEEKDAYS = [
  { label: "Lunes", abbr: "Lun" },
  { label: "Martes", abbr: "Mar" },
  { label: "Miércoles", abbr: "Mié" },
  { label: "Jueves", abbr: "Jue" },
  { label: "Viernes", abbr: "Vie" },
  { label: "Sábado", abbr: "Sáb" },
  { label: "Domingo", abbr: "Dom" },
];

const currentMonth = ref(resolveInitialMonth(props.initialMonth, props.events));

const monthHeading = computed(() =>
  new Intl.DateTimeFormat(props.locale, {
    month: "long",
    year: "numeric",
  }).format(currentMonth.value)
);

const calendarDays = computed(() =>
  getMonthCalendarDays(currentMonth.value, props.events)
);

const calendarWeeks = computed(() => {
  const weeks = [];

  for (let index = 0; index < calendarDays.value.length; index += 7) {
    weeks.push(calendarDays.value.slice(index, index + 7));
  }

  return weeks;
});

const mobileEventDays = computed(() =>
  calendarDays.value.filter(
    (day) => day.isCurrentMonth && day.events.length > 0
  )
);

const calendarId = computed(() => `calendar-${toIsoMonth(currentMonth.value)}`);

const goToPreviousMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, -1);
};

const goToNextMonth = () => {
  currentMonth.value = addMonths(currentMonth.value, 1);
};

const formatDayLabel = (date: Date) =>
  new Intl.DateTimeFormat(props.locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

const eventLabel = (event: CalendarEvent) =>
  [event.time, event.title, event.location].filter(Boolean).join(" · ");

const eventDomId = (event: CalendarEvent) =>
  String(event.id).replace(/[^a-zA-Z0-9_-]/g, "-");

const eventAnchorId = (
  view: "desktop" | "mobile",
  dayIsoDate: string,
  event: CalendarEvent
) => `${calendarId.value}-${view}-${dayIsoDate}-${eventDomId(event)}-trigger`;

const eventPopoverId = (
  view: "desktop" | "mobile",
  dayIsoDate: string,
  event: CalendarEvent
) => `${calendarId.value}-${view}-${dayIsoDate}-${eventDomId(event)}-popover`;

const getPopoverElement = (id: string) => {
  const element = document.getElementById(id);

  if (!element || !("showPopover" in element)) return undefined;

  return element as HTMLElement & {
    showPopover: (options?: { source?: HTMLElement }) => void;
    hidePopover: () => void;
  };
};

const showPopover = (event: MouseEvent | FocusEvent, popoverId: string) => {
  const popover = getPopoverElement(popoverId);
  const source = event.currentTarget;

  if (!(source instanceof HTMLElement) || !popover) return;
  if (popover.matches(":popover-open")) return;

  popover.showPopover({ source });
};

const hidePopover = (popoverId: string) => {
  const popover = getPopoverElement(popoverId);

  if (!popover || !popover.matches(":popover-open")) return;

  popover.hidePopover();
};
</script>

<template>
  <section
    :aria-labelledby="`${calendarId}-heading`"
    class="border-border-subtle bg-surface-card rounded-2xl border p-4 shadow-sm
      sm:p-6"
  >
    <div class="mb-6 flex items-center justify-between gap-4">
      <h2
        :id="`${calendarId}-heading`"
        class="text-content-heading text-xl font-bold capitalize"
      >
        {{ monthHeading }}
      </h2>

      <div class="flex gap-2">
        <Button
          variant="outline"
          size="md"
          class="p-2"
          :aria-label="previousLabel"
          @click="goToPreviousMonth"
        >
          <Icon name="ChevronLeft" :size="20" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="md"
          class="p-2"
          :aria-label="nextLabel"
          @click="goToNextMonth"
        >
          <Icon name="ChevronRight" :size="20" aria-hidden="true" />
        </Button>
      </div>
    </div>

    <div
      class="border-border-default hidden overflow-hidden rounded-xl border
        sm:block"
    >
      <table
        class="-m-px w-[calc(100%+2px)] table-fixed border-collapse"
        :aria-labelledby="`${calendarId}-heading`"
      >
        <thead>
          <tr>
            <th
              v-for="weekday in WEEKDAYS"
              :key="weekday.abbr"
              scope="col"
              :abbr="weekday.abbr"
              class="border-border-default bg-surface-subtle text-content-muted
                border p-2 text-center text-xs font-semibold uppercase"
            >
              <span aria-hidden="true">{{ weekday.abbr }}</span>
              <span class="sr-only">{{ weekday.label }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex">
            <td
              v-for="day in week"
              :key="day.isoDate"
              :class="[
                `border-border-default bg-surface-card h-32 border p-2 align-top
                transition-colors`,
                day.events.length ? 'hover:bg-surface-subtle' : '',
                !day.isCurrentMonth
                  ? 'bg-surface-muted/60 text-content-subtle'
                  : '',
              ]"
            >
              <time
                :datetime="day.isoDate"
                :class="[
                  `inline-flex size-7 items-center justify-center rounded-full
                  text-sm font-semibold`,
                  day.events.length && day.isCurrentMonth
                    ? 'bg-surface-brand text-content-on-brand'
                    : 'text-content-body',
                ]"
              >
                {{ day.dayOfMonth }}
              </time>

              <div v-if="day.events.length" class="mt-2 space-y-1">
                <a
                  v-for="event in day.events"
                  :id="eventAnchorId('desktop', day.isoDate, event)"
                  :key="event.id"
                  :href="event.href"
                  :class="[
                    `calendar-event-link border-border-brand-tint
                    bg-surface-brand-tint text-content-brand
                    focus-visible:ring-ring-brand
                    hover:bg-surface-brand-tint-hover relative block rounded
                    border px-2 py-1 text-xs font-semibold transition-colors
                    focus-visible:ring-2 focus-visible:ring-offset-2
                    focus-visible:outline-none`,
                    event.status === 'past'
                      ? `border-border-default bg-surface-muted
                        text-content-muted hover:bg-surface-muted`
                      : '',
                  ]"
                  @mouseenter="
                    showPopover(
                      $event,
                      eventPopoverId('desktop', day.isoDate, event)
                    )
                  "
                  @mouseleave="
                    hidePopover(eventPopoverId('desktop', day.isoDate, event))
                  "
                  @focus="
                    showPopover(
                      $event,
                      eventPopoverId('desktop', day.isoDate, event)
                    )
                  "
                  @blur="
                    hidePopover(eventPopoverId('desktop', day.isoDate, event))
                  "
                >
                  <span class="block truncate">
                    <span v-if="event.time">{{ event.time }} · </span
                    >{{ event.title }}
                  </span>
                  <span
                    :id="eventPopoverId('desktop', day.isoDate, event)"
                    class="calendar-event-popover"
                    popover="hint"
                    aria-hidden="true"
                    :anchor="eventAnchorId('desktop', day.isoDate, event)"
                  >
                    {{ eventLabel(event) }}
                  </span>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="sm:hidden">
      <div v-if="mobileEventDays.length" class="space-y-4">
        <article
          v-for="day in mobileEventDays"
          :key="day.isoDate"
          class="border-border-subtle border-b pb-4 last:border-b-0 last:pb-0"
        >
          <h3 class="text-content-heading text-sm font-bold capitalize">
            <time :datetime="day.isoDate">{{ formatDayLabel(day.date) }}</time>
          </h3>

          <div class="mt-3 space-y-2">
            <a
              v-for="event in day.events"
              :id="eventAnchorId('mobile', day.isoDate, event)"
              :key="event.id"
              :href="event.href"
              :class="[
                `calendar-event-link border-border-brand-tint
                bg-surface-brand-tint text-content-brand
                focus-visible:ring-ring-brand hover:bg-surface-brand-tint-hover
                relative block rounded-lg border px-3 py-2 text-sm font-semibold
                transition-colors focus-visible:ring-2
                focus-visible:ring-offset-2 focus-visible:outline-none`,
                event.status === 'past'
                  ? `border-border-default bg-surface-muted text-content-muted
                    hover:bg-surface-muted`
                  : '',
              ]"
              @mouseenter="
                showPopover(
                  $event,
                  eventPopoverId('mobile', day.isoDate, event)
                )
              "
              @mouseleave="
                hidePopover(eventPopoverId('mobile', day.isoDate, event))
              "
              @focus="
                showPopover(
                  $event,
                  eventPopoverId('mobile', day.isoDate, event)
                )
              "
              @blur="hidePopover(eventPopoverId('mobile', day.isoDate, event))"
            >
              <span class="block leading-snug">{{ event.title }}</span>
              <span
                v-if="event.time || event.location"
                class="text-content-muted mt-1 block text-xs font-medium"
              >
                <template v-if="event.time">{{ event.time }}</template>
                <template v-if="event.time && event.location"> · </template>
                <template v-if="event.location">{{ event.location }}</template>
              </span>
              <span
                :id="eventPopoverId('mobile', day.isoDate, event)"
                class="calendar-event-popover"
                popover="hint"
                aria-hidden="true"
                :anchor="eventAnchorId('mobile', day.isoDate, event)"
              >
                {{ eventLabel(event) }}
              </span>
            </a>
          </div>
        </article>
      </div>

      <EmptyState
        v-else
        title="No hay eventos este mes"
        description="Prueba a cambiar de mes, localidad o estado de eventos."
      />
    </div>
  </section>
</template>

<style scoped>
.calendar-event-popover {
  max-width: min(18rem, calc(100vw - 2rem));
  margin: 0;
  border: 0;
  border-radius: 0.375rem;
  background: #000;
  color: #fff;
  padding: 0.5rem 0.75rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.3),
    0 4px 6px -4px rgb(0 0 0 / 0.3);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.35;
  white-space: normal;
}

.calendar-event-popover:popover-open {
  inset: auto;
  position-area: top;
}

@supports not selector(:popover-open) {
  .calendar-event-popover {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    left: 0;
    z-index: 20;
    display: none;
  }

  .calendar-event-link:hover .calendar-event-popover,
  .calendar-event-link:focus-visible .calendar-event-popover {
    display: block;
  }
}
</style>
