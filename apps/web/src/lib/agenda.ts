import type { WebEvent, WebEventStatus } from "./events";

export const AGENDA_ITEMS_PER_PAGE = 9;
export const DEFAULT_AGENDA_STATUS: WebEventStatus = "upcoming";
export const DEFAULT_AGENDA_LOCALITY = "all";
export const DEFAULT_AGENDA_PAGE = 1;

export type AgendaState = {
  status: WebEventStatus;
  locality: string;
  page: number;
};

export type AgendaLocality = {
  id: string;
  label: string;
};

type AgendaEvent = Pick<WebEvent, "location" | "status">;

export const normalizeLocalityId = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const localityIdForEvent = (event: Pick<AgendaEvent, "location">) =>
  normalizeLocalityId(event.location ?? "la-rioja-baja") || "la-rioja-baja";

export const getAgendaLocalities = (events: AgendaEvent[]) => {
  const localityMap = new Map<string, AgendaLocality>();

  for (const event of events) {
    const label = event.location ?? "La Rioja Baja";
    const id = localityIdForEvent(event);

    if (!localityMap.has(id)) {
      localityMap.set(id, {
        id,
        label,
      });
    }
  }

  return Array.from(localityMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label, "es")
  );
};

export const filterAgendaEvents = <TEvent extends AgendaEvent>(
  events: TEvent[],
  state: AgendaState
) =>
  events.filter(
    (event) =>
      event.status === state.status &&
      (state.locality === DEFAULT_AGENDA_LOCALITY ||
        localityIdForEvent(event) === state.locality)
  );

export const getAgendaTotalPages = (events: AgendaEvent[], state: AgendaState) =>
  Math.max(
    1,
    Math.ceil(filterAgendaEvents(events, state).length / AGENDA_ITEMS_PER_PAGE)
  );

export const getAgendaPageEvents = <TEvent extends AgendaEvent>(
  events: TEvent[],
  state: AgendaState
) => {
  const start = (state.page - 1) * AGENDA_ITEMS_PER_PAGE;
  return filterAgendaEvents(events, state).slice(
    start,
    start + AGENDA_ITEMS_PER_PAGE
  );
};

const statusPathByStatus: Record<WebEventStatus, string> = {
  upcoming: "proximos",
  past: "historico",
};

const statusByStatusPath: Record<string, WebEventStatus> = {
  proximos: "upcoming",
  historico: "past",
};

export const getAgendaUrl = (state: AgendaState) => {
  const statusPath = statusPathByStatus[state.status];
  const localityPath =
    state.locality === DEFAULT_AGENDA_LOCALITY
      ? ""
      : `/localidad/${state.locality}`;
  const pagePath =
    state.page <= DEFAULT_AGENDA_PAGE ? "" : `/pagina/${state.page}`;

  if (
    state.status === DEFAULT_AGENDA_STATUS &&
    state.locality === DEFAULT_AGENDA_LOCALITY &&
    state.page === DEFAULT_AGENDA_PAGE
  ) {
    return "/";
  }

  return `/agenda/${statusPath}${localityPath}${pagePath}/`;
};

export const getAgendaPathParam = (state: AgendaState) => {
  const url = getAgendaUrl(state);
  return url === "/" ? undefined : url.replace(/^\/agenda\/|\/$/g, "");
};

export const parseAgendaPath = (path = ""): AgendaState | null => {
  const segments = path.split("/").filter(Boolean);
  const status = statusByStatusPath[segments[0] ?? "proximos"];

  if (!status) {
    return null;
  }

  let locality = DEFAULT_AGENDA_LOCALITY;
  let page = DEFAULT_AGENDA_PAGE;
  let index = 1;

  if (segments[index] === "localidad") {
    const localitySegment = segments[index + 1];

    if (!localitySegment) {
      return null;
    }

    locality = localitySegment;
    index += 2;
  }

  if (segments[index] === "pagina") {
    const pageSegment = segments[index + 1];
    const parsedPage = Number(pageSegment);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return null;
    }

    page = parsedPage;
    index += 2;
  }

  return index === segments.length ? { status, locality, page } : null;
};

export const getAgendaStaticStates = (events: WebEvent[]) => {
  const localities = [
    DEFAULT_AGENDA_LOCALITY,
    ...getAgendaLocalities(events).map((locality) => locality.id),
  ];
  const states: AgendaState[] = [];

  for (const status of ["upcoming", "past"] satisfies WebEventStatus[]) {
    for (const locality of localities) {
      const baseState = { status, locality, page: DEFAULT_AGENDA_PAGE };
      const totalPages = getAgendaTotalPages(events, baseState);

      for (let page = 1; page <= totalPages; page += 1) {
        states.push({ status, locality, page });
      }
    }
  }

  return states;
};

export const getAgendaPageTitle = (
  state: AgendaState,
  localities: AgendaLocality[]
) => {
  const section =
    state.status === "past" ? "Eventos pasados" : "Próximos eventos";
  const locality =
    state.locality === DEFAULT_AGENDA_LOCALITY
      ? "La Rioja Baja"
      : (localities.find((item) => item.id === state.locality)?.label ??
        "La Rioja Baja");
  const page = state.page > 1 ? ` - Página ${state.page}` : "";

  return `${section} en ${locality}${page} | Agenda Rioja Baja`;
};
