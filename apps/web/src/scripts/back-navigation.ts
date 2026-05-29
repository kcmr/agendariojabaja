const agendaFocusTargetKey = "agenda:focus-target";
const agendaPathPattern = /^\/(?:$|agenda(?:\/|$))/;

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

const shouldRestoreAgendaFocus = (url: URL) =>
  url.origin === window.location.origin && agendaPathPattern.test(url.pathname);

const storeAgendaFocusTarget = (link: HTMLAnchorElement, nextUrl: URL) => {
  if (!shouldRestoreAgendaFocus(nextUrl)) {
    return;
  }

  const explicitTarget = link.dataset.agendaFocusId;
  const targetId = explicitTarget || link.id;

  if (!targetId) {
    return;
  }

  window.sessionStorage.setItem(agendaFocusTargetKey, targetId);
};

const restoreAgendaFocus = () => {
  const targetId = window.sessionStorage.getItem(agendaFocusTargetKey);

  if (!targetId) {
    return;
  }

  window.sessionStorage.removeItem(agendaFocusTargetKey);

  const target = document.getElementById(targetId);

  if (!(target instanceof HTMLElement)) {
    return;
  }

  target.focus({ preventScroll: true });
};

document.addEventListener("click", (event) => {
  if (!(event instanceof MouseEvent) || isModifiedClick(event)) {
    return;
  }

  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest("a[href]");

  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const nextUrl = getSameOriginUrl(link.href);

  if (nextUrl) {
    storeAgendaFocusTarget(link, nextUrl);
  }
});

document.addEventListener("astro:page-load", () => {
  restoreAgendaFocus();
});

restoreAgendaFocus();
