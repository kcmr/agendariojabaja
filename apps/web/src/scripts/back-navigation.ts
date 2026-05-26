type AgendaBackState = {
  from: string;
  to: string;
  at: number;
};

const agendaBackStateKey = "agenda:back-state";
const agendaBackStateMaxAge = 30 * 60 * 1000;
const eventDetailPathPattern = /^\/eventos\/[^/]+\/?$/;

const getSameOriginUrl = (href: string) => {
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin ? url : null;
  } catch {
    return null;
  }
};

const isModifiedClick = (event: MouseEvent) =>
  event.button !== 0 ||
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey;

const getStoredAgendaBackState = () => {
  try {
    const value = window.sessionStorage.getItem(agendaBackStateKey);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as AgendaBackState;
  } catch {
    return null;
  }
};

document.addEventListener("click", (event) => {
  if (!(event instanceof MouseEvent) || isModifiedClick(event)) {
    return;
  }

  if (!(event.target instanceof Element)) {
    return;
  }

  const backLink = event.target.closest("[data-back-link]");

  if (backLink instanceof HTMLAnchorElement) {
    const state = getStoredAgendaBackState();
    const currentUrl = window.location.href;
    const isFresh = state && Date.now() - state.at < agendaBackStateMaxAge;

    if (isFresh && state.to === currentUrl && history.length > 1) {
      event.preventDefault();
      window.history.back();
    }

    return;
  }

  const link = event.target.closest("a[href]");

  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const nextUrl = getSameOriginUrl(link.href);

  if (!nextUrl || !eventDetailPathPattern.test(nextUrl.pathname)) {
    return;
  }

  window.sessionStorage.setItem(
    agendaBackStateKey,
    JSON.stringify({
      from: window.location.href,
      to: nextUrl.href,
      at: Date.now(),
    } satisfies AgendaBackState)
  );
});
