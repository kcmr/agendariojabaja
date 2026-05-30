import type { WebEvent } from "./events";

export const AGENDA_ITEMS_PER_PAGE = 9;
export const DEFAULT_AGENDA_LOCALITY = "all";
export const DEFAULT_AGENDA_PAGE = 1;

export type AgendaState = {
  locality: string;
  page: number;
};

export type AgendaLocality = {
  id: string;
  label: string;
};

type AgendaEvent = Pick<WebEvent, "location" | "status">;

export const AGENDA_LOCALITIES = [
  { id: "aldeanueva-de-ebro", label: "Aldeanueva de Ebro" },
  { id: "alfaro", label: "Alfaro" },
  { id: "arnedillo", label: "Arnedillo" },
  { id: "arnedo", label: "Arnedo" },
  { id: "autol", label: "Autol" },
  { id: "calahorra", label: "Calahorra" },
  { id: "cornago", label: "Cornago" },
  { id: "el-villar-de-arnedo", label: "El Villar de Arnedo" },
  { id: "enciso", label: "Enciso" },
  { id: "igea", label: "Igea" },
  { id: "pradejon", label: "Pradejón" },
  { id: "prejano", label: "Préjano" },
  { id: "quel", label: "Quel" },
  { id: "rincon-de-soto", label: "Rincón de Soto" },
] satisfies AgendaLocality[];

export const normalizeLocalityId = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const localityIdForEvent = (event: Pick<AgendaEvent, "location">) =>
  normalizeLocalityId(event.location ?? "la-rioja-baja") || "la-rioja-baja";

export const getAgendaLocalities = () => AGENDA_LOCALITIES;

export const filterAgendaEvents = <TEvent extends AgendaEvent>(
  events: TEvent[],
  state: AgendaState
) =>
  events.filter(
    (event) =>
      event.status === "upcoming" &&
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

export const getAgendaUrl = (state: AgendaState) => {
  const localityPath =
    state.locality === DEFAULT_AGENDA_LOCALITY
      ? ""
      : `/localidad/${state.locality}`;
  const pagePath =
    state.page <= DEFAULT_AGENDA_PAGE ? "" : `/pagina/${state.page}`;

  if (
    state.locality === DEFAULT_AGENDA_LOCALITY &&
    state.page === DEFAULT_AGENDA_PAGE
  ) {
    return "/";
  }

  return `/agenda${localityPath}${pagePath}/`;
};

export const getAgendaPathParam = (state: AgendaState) => {
  const url = getAgendaUrl(state);
  return url === "/" ? undefined : url.replace(/^\/agenda\/|\/$/g, "");
};

export const parseAgendaPath = (path = ""): AgendaState | null => {
  const segments = path.split("/").filter(Boolean);
  let locality = DEFAULT_AGENDA_LOCALITY;
  let page = DEFAULT_AGENDA_PAGE;
  let index = 0;

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

  return index === segments.length ? { locality, page } : null;
};

export const getAgendaStaticStates = (events: WebEvent[]) => {
  const localities = [
    DEFAULT_AGENDA_LOCALITY,
    ...getAgendaLocalities().map((locality) => locality.id),
  ];
  const states: AgendaState[] = [];

  for (const locality of localities) {
    const baseState = { locality, page: DEFAULT_AGENDA_PAGE };
    const totalPages = getAgendaTotalPages(events, baseState);

    for (let page = 1; page <= totalPages; page += 1) {
      states.push({ locality, page });
    }
  }

  return states;
};

export const getAgendaPageTitle = (
  state: AgendaState,
  localities: AgendaLocality[]
) => {
  const locality =
    state.locality === DEFAULT_AGENDA_LOCALITY
      ? "La Rioja Baja"
      : (localities.find((item) => item.id === state.locality)?.label ??
        "La Rioja Baja");
  const page = state.page > 1 ? ` - Página ${state.page}` : "";

  return `Eventos en ${locality}${page} | Agenda Rioja Baja`;
};

export const getAgendaPageDescription = (
  state: AgendaState,
  localities: AgendaLocality[]
) => {
  const page = state.page > 1 ? ` Página ${state.page}.` : "";

  if (state.locality === DEFAULT_AGENDA_LOCALITY) {
    return `Agenda de eventos, planes de ocio, cultura, fiestas y actividades en La Rioja Baja.${page} Encuentra propuestas actualizadas cerca de ti.`;
  }

  const locality =
    localities.find((item) => item.id === state.locality)?.label ??
    "La Rioja Baja";

  return `Eventos en ${locality}: planes de ocio, cultura, fiestas y actividades próximas en La Rioja Baja.${page} Consulta la agenda actualizada.`;
};
