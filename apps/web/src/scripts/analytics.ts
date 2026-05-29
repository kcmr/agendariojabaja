type AnalyticsValue = string | number | boolean;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: AnalyticsPayload) => void;
    };
    __agendaAnalyticsInitialized?: boolean;
  }
}

const DATA_PREFIX = "data-analytics-";
const EVENT_ATTRIBUTE = `${DATA_PREFIX}event`;

const normalizeAttributeName = (name: string) =>
  name.replace(DATA_PREFIX, "").replace(/-/g, "_");

const getPayload = (element: Element): AnalyticsPayload => {
  const payload: AnalyticsPayload = {};

  for (const attribute of element.getAttributeNames()) {
    if (!attribute.startsWith(DATA_PREFIX) || attribute === EVENT_ATTRIBUTE) {
      continue;
    }

    const value = element.getAttribute(attribute);
    if (!value) continue;

    payload[normalizeAttributeName(attribute)] = value;
  }

  if (element instanceof HTMLAnchorElement && element.href) {
    payload.href = element.href;
  }

  return payload;
};

export const trackAnalyticsEvent = (
  eventName: string,
  payload?: AnalyticsPayload,
) => {
  if (typeof window === "undefined") return;

  window.umami?.track(eventName, payload);
};

const trackElement = (element: Element) => {
  const eventName = element.getAttribute(EVENT_ATTRIBUTE);
  if (!eventName) return;

  trackAnalyticsEvent(eventName, getPayload(element));
};

const initAnalytics = () => {
  if (window.__agendaAnalyticsInitialized) return;

  document.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Element)) return;

      const element = event.target.closest(`[${EVENT_ATTRIBUTE}]`);
      if (!element) return;

      trackElement(element);
    },
    { capture: true },
  );

  document.addEventListener(
    "submit",
    (event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      if (!event.target.hasAttribute(EVENT_ATTRIBUTE)) return;

      trackElement(event.target);
    },
    { capture: true },
  );

  window.__agendaAnalyticsInitialized = true;
};

if (typeof window !== "undefined") {
  initAnalytics();
}
