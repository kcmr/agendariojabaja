import {
  Calendar,
  List,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  ExternalLink,
  Ticket,
  ArrowLeft,
  Clock,
  Megaphone,
} from "lucide-react";
import React, { useState } from "react";

// --- MOCK DATA ---
const LOCALITIES = [
  {
    id: "all",
    name: "Toda La Rioja Baja",
    img: "https://images.unsplash.com/photo-1596395819057-cb373310086c?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "calahorra",
    name: "Calahorra",
    img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "arnedo",
    name: "Arnedo",
    img: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "alfaro",
    name: "Alfaro",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "cervera",
    name: "Cervera",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: "autol",
    name: "Autol",
    img: "https://images.unsplash.com/photo-1513147122760-ad1d5eb682b9?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

const EVENTS = [
  {
    id: 1,
    title: "Cata de Vinos y Maridaje",
    locality: "calahorra",
    date: "2026-04-24",
    time: "19:30",
    category: "Gastronomía",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600&h=400",
    price: "25€",
    description:
      "Descubre los sabores de La Rioja Baja en esta cata exclusiva. Probaremos 4 vinos de bodegas locales maridados con pinchos elaborados con producto de kilómetro cero. Una experiencia perfecta para adentrarse en la cultura vitivinícola de nuestra tierra, guiada por enólogos expertos.",
    sourceLink: "https://facebook.com",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Concierto Acústico en la Plaza",
    locality: "arnedo",
    date: "2026-04-25",
    time: "22:00",
    category: "Música",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600&h=400",
    price: "Gratis",
    description:
      "La plaza principal se llena de música en directo este fin de semana. Disfruta de un ambiente relajado con bandas locales versionando clásicos del pop y rock. Habrá servicio de barra a cargo de las peñas del municipio.",
    sourceLink: "https://facebook.com",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Mercado de Artesanía Local",
    locality: "alfaro",
    date: "2026-04-26",
    time: "10:00 - 14:00",
    category: "Mercados",
    img: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=600&h=400",
    price: "Gratis",
    description:
      "Más de 30 puestos de artesanos de toda La Rioja y comunidades limítrofes se dan cita en este mercado tradicional. Podrás encontrar cerámica, marroquinería, joyería hecha a mano y productos de alimentación artesanal.",
    sourceLink: "https://facebook.com",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Ruta de Senderismo: Miradores",
    locality: "autol",
    date: "2026-04-26",
    time: "09:00",
    category: "Naturaleza",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600&h=400",
    price: "5€",
    description:
      "Ruta guiada de dificultad media (12km) recorriendo los principales miradores naturales de la zona. El precio incluye seguro de accidentes y un pequeño almuerzo a mitad de ruta. Imprescindible llevar calzado adecuado.",
    sourceLink: "https://facebook.com",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Exposición de Calzado Histórico",
    locality: "arnedo",
    date: "2026-04-28",
    time: "17:00 - 20:00",
    category: "Cultura",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600&h=400",
    price: "Gratis",
    description:
      "Arnedo, ciudad del calzado, acoge esta exposición temporal que repasa la evolución de la industria zapatera en el municipio desde principios del siglo XX hasta la actualidad, mostrando maquinaria antigua y diseños icónicos.",
    sourceLink: "https://facebook.com",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Fiestas de la Juventud",
    locality: "cervera",
    date: "2026-05-01",
    time: "Todo el día",
    category: "Fiestas",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600&h=400",
    price: "Gratis",
    description:
      "Jornada festiva con encierros de reses bravas por la mañana, degustaciones populares a mediodía y verbena nocturna. Un día pensado para que los jóvenes (y no tan jóvenes) disfruten de las tradiciones locales.",
    sourceLink: "https://facebook.com",
    status: "upcoming",
  },
  // --- EVENTOS PASADOS (Para SEO y archivo) ---
  {
    id: 7,
    title: "Carnavales 2026",
    locality: "calahorra",
    date: "2026-02-15",
    time: "18:00",
    category: "Fiestas",
    img: "https://images.unsplash.com/photo-1563810174-8848fde4f159?auto=format&fit=crop&q=80&w=600&h=400",
    price: "Gratis",
    description:
      "Desfile de carrozas y comparsas por las calles céntricas de Calahorra. Concurso de disfraces con premios en metálico para las mejores categorías individuales y grupales.",
    sourceLink: "https://facebook.com",
    status: "past",
  },
  {
    id: 8,
    title: "Jornadas de la Verdura",
    locality: "calahorra",
    date: "2026-03-20",
    time: "Varios horarios",
    category: "Gastronomía",
    img: "https://images.unsplash.com/photo-1593582390623-289541a5d625?auto=format&fit=crop&q=80&w=600&h=400",
    price: "Variable",
    description:
      "Un año más celebramos la riqueza de nuestra huerta. Pinchos especiales en los bares de la ruta, charlas nutricionales y mercado de producto fresco en la plaza del Raso.",
    sourceLink: "https://facebook.com",
    status: "past",
  },
];

const ITEMS_PER_PAGE = 6;

// --- COMPONENTS ---

const AdSpace = ({ type = "horizontal" }) => (
  <div
    className={`my-6 flex w-full flex-col items-center justify-center rounded-xl
      border border-gray-200 bg-gray-100 p-4 shadow-sm
      ${type === "horizontal" ? "h-32" : "h-64"} group relative overflow-hidden`}
  >
    <span className="mb-2 text-xs tracking-widest text-gray-400 uppercase">
      Espacio Patrocinado
    </span>
    <span className="mb-3 text-sm font-medium text-gray-500">
      Publicidad - {type === "horizontal" ? "728x90" : "300x250"}
    </span>
    <button
      className="flex items-center gap-2 rounded-md border border-gray-300
        bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 opacity-0
        shadow-sm transition-opacity group-hover:opacity-100 hover:bg-gray-50"
    >
      <Megaphone size={14} /> Anúnciate aquí
    </button>
  </div>
);

const Header = ({ onLogoClick }) => (
  <header className="sticky top-0 z-50 bg-white shadow-sm">
    <div
      className="h-1.5 w-full"
      style={{
        background:
          "linear-gradient(to right, #DA121A, #FFFFFF, #0B8043, #F3CC22)",
      }}
    ></div>
    <div
      className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4
        sm:px-6 lg:px-8"
    >
      <div
        className="group flex cursor-pointer items-center gap-3"
        onClick={onLogoClick}
      >
        <div
          className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl
            border border-gray-200 shadow-sm"
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="flex flex-1">
              <div className="flex-1 bg-[#DA121A]"></div>
              <div className="flex-1 bg-[#FFFFFF]"></div>
            </div>
            <div className="flex flex-1">
              <div className="flex-1 bg-[#0B8043]"></div>
              <div className="flex-1 bg-[#F3CC22]"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-lg bg-white/90 p-1.5 shadow-sm
                backdrop-blur-sm"
            >
              <Calendar size={18} className="text-gray-900" />
            </div>
          </div>
        </div>
        <div>
          <h1
            className="text-xl leading-none font-bold text-gray-900
              transition-colors group-hover:text-[#DA121A]"
          >
            Agenda<span className="text-[#DA121A]">RiojaBaja</span>
          </h1>
          <p className="text-xs font-medium text-gray-500">
            Eventos y ocio local
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#sponsor"
          className="hidden items-center gap-1.5 text-sm font-medium
            text-gray-500 transition-colors hover:text-gray-900 md:flex"
        >
          <Megaphone size={16} /> Patrocínanos
        </a>
        <a
          href="#newsletter"
          className="hidden items-center gap-2 text-sm font-medium text-gray-600
            transition-colors hover:text-[#DA121A] sm:flex"
        >
          <Mail size={16} /> Suscríbete
        </a>
        <button
          className="rounded-lg bg-[#DA121A] px-4 py-2 text-sm font-semibold
            text-white shadow-md transition-colors hover:bg-red-700"
        >
          Publicar Evento
        </button>
      </div>
    </div>
  </header>
);

const FilterSection = ({ selected, onSelect }) => (
  <div className="overflow-hidden py-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold text-gray-900">¿Dónde buscas planes?</h2>
    </div>
    <div
      className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-4"
      style={{ scrollbarWidth: "none" }}
    >
      {LOCALITIES.map((loc) => (
        <button
          key={loc.id}
          onClick={() => onSelect(loc.id)}
          className={`relative shrink-0 snap-start overflow-hidden rounded-2xl
          transition-all duration-300 ${
            selected === loc.id
              ? "scale-95 shadow-md ring-4 ring-[#DA121A] ring-offset-2"
              : "opacity-80 hover:scale-105 hover:opacity-100"
          }`}
          style={{ width: "120px", height: "120px" }}
        >
          <img
            src={loc.img}
            alt={loc.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80
              via-black/30 to-transparent"
          ></div>
          <span
            className="absolute bottom-3 left-0 w-full px-2 text-center text-sm
              font-semibold text-white"
          >
            {loc.name}
          </span>
        </button>
      ))}
    </div>
  </div>
);

const EventCard = ({ event, onClick }) => {
  const locName =
    LOCALITIES.find((l) => l.id === event.locality)?.name || event.locality;

  return (
    <article
      onClick={() => onClick(event)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden
        rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow
        hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.img}
          alt={event.title}
          className={`h-full w-full object-cover transition-transform
            duration-500
            ${event.status === "past" ? "opacity-80 grayscale" : "group-hover:scale-105"}`}
        />
        {event.status === "past" && (
          <div
            className="absolute inset-0 flex items-center justify-center
              bg-black/40"
          >
            <span
              className="rounded-lg bg-white px-4 py-2 font-bold text-gray-900
                shadow-lg"
            >
              Evento Finalizado
            </span>
          </div>
        )}
        <div
          className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1
            text-xs font-bold text-[#0B8043] shadow-sm backdrop-blur-sm"
        >
          {event.category}
        </div>
        <div
          className="absolute top-3 right-3 flex items-center gap-1 rounded-full
            bg-[#F3CC22] px-3 py-1 text-xs font-bold text-gray-900 shadow-sm"
        >
          <Ticket size={14} /> {event.price}
        </div>
      </div>
      <div className="flex flex-grow flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <span
            className={`rounded-md px-2 py-1 font-semibold ${
                event.status === "past"
                  ? "bg-gray-100 text-gray-500"
                  : "bg-red-50 text-[#DA121A]"
              }`}
          >
            {event.date}
          </span>
          <span>•</span>
          <span>{event.time}</span>
        </div>
        <h3
          className="mb-2 text-xl leading-tight font-bold text-gray-900
            transition-colors group-hover:text-[#DA121A]"
        >
          {event.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {event.description}
        </p>
        <div
          className="mt-auto flex items-center justify-between border-t
            border-gray-100 pt-4"
        >
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin
              size={16}
              className={
                event.status === "past" ? "text-gray-400" : "text-[#DA121A]"
              }
            />
            <span className="text-sm font-medium">{locName}</span>
          </div>
          <span
            className="text-sm font-semibold text-[#DA121A] opacity-0
              transition-opacity group-hover:opacity-100"
          >
            Ver más &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};

const EventDetail = ({ event, onBack }) => {
  const locName =
    LOCALITIES.find((l) => l.id === event.locality)?.name || event.locality;

  // Hacemos scroll top al montar el componente (simulación en React)
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-4xl
        py-8 duration-500"
    >
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 font-medium text-gray-600
          transition-colors hover:text-[#DA121A]"
      >
        <ArrowLeft size={20} /> Volver a la agenda
      </button>

      <div
        className="overflow-hidden rounded-3xl border border-gray-100 bg-white
          shadow-sm"
      >
        <div className="relative h-64 w-full sm:h-96">
          <img
            src={event.img}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          {event.status === "past" && (
            <div
              className="absolute inset-0 flex items-center justify-center
                bg-black/50"
            >
              <span
                className="rounded-xl bg-white px-6 py-3 text-lg font-bold
                  text-gray-900 shadow-lg"
              >
                Este evento ya se ha celebrado
              </span>
            </div>
          )}
        </div>

        <div className="p-8 sm:p-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border border-green-100 bg-green-50 px-3
                py-1 text-sm font-bold text-[#0B8043]"
            >
              {event.category}
            </span>
            <span
              className="flex items-center gap-1 rounded-full border
                border-yellow-100 bg-yellow-50 px-3 py-1 text-sm font-bold
                text-yellow-800"
            >
              <Ticket size={16} /> {event.price}
            </span>
          </div>

          <h1
            className="mb-6 text-3xl leading-tight font-extrabold text-gray-900
              sm:text-4xl"
          >
            {event.title}
          </h1>

          <div
            className="mb-8 grid grid-cols-1 gap-6 rounded-2xl border
              border-gray-100 bg-gray-50 p-6 md:grid-cols-2"
          >
            <div className="flex items-center gap-4">
              <div
                className="rounded-full bg-white p-3 text-[#DA121A] shadow-sm"
              >
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Fecha y Hora
                </p>
                <p className="font-semibold text-gray-900">
                  {event.date} • {event.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="rounded-full bg-white p-3 text-[#DA121A] shadow-sm"
              >
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ubicación</p>
                <p className="font-semibold text-gray-900">{locName}</p>
              </div>
            </div>
          </div>

          <div className="prose mb-10 max-w-none">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Sobre el evento
            </h2>
            <p
              className="text-lg leading-relaxed whitespace-pre-line
                text-gray-600"
            >
              {event.description}
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-between gap-4 border-t
              border-gray-100 pt-8 sm:flex-row"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} /> Publicado originamente en Facebook
            </div>
            <a
              href={event.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2
                rounded-xl bg-[#3b5998] px-6 py-3 font-semibold text-white
                shadow-sm transition-colors hover:bg-[#2d4373] sm:w-auto"
            >
              <ExternalLink size={18} /> Ver fuente original
            </a>
          </div>
        </div>
      </div>

      <AdSpace type="horizontal" />
    </div>
  );
};

const CalendarView = ({ events, onClickEvent }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const getEventsForDay = (day) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    return events.filter((e) => e.date.endsWith(`-${dayStr}`));
  };

  return (
    <div
      className="animate-in fade-in rounded-2xl border border-gray-100 bg-white
        p-6 shadow-sm duration-300"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Abril 2026</h2>
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-7 gap-px overflow-hidden rounded-xl
          bg-gray-200"
      >
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-xs font-semibold
              tracking-wider text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;
          return (
            <div
              key={day}
              className={`min-h-[100px] bg-white p-2 transition-colors
              ${hasEvents ? "hover:bg-gray-50" : ""}`}
            >
              <span
                className={`text-sm font-semibold ${
                  hasEvents
                    ? `flex h-6 w-6 items-center justify-center rounded-full
                      bg-[#DA121A] text-white`
                    : "text-gray-700"
                }`}
              >
                {day}
              </span>
              <div className="mt-2 space-y-1">
                {dayEvents.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => onClickEvent(e)}
                    className="cursor-pointer truncate rounded border
                      border-red-100 bg-red-50 p-1 text-[10px] text-[#DA121A]
                      transition-colors hover:bg-red-100"
                    title={e.title}
                  >
                    {e.time} - {e.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeView, setActiveView] = useState("list"); // 'list' | 'calendar'
  const [eventStatus, setEventStatus] = useState("upcoming"); // 'upcoming' | 'past'
  const [selectedLocality, setSelectedLocality] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reiniciar la página si cambian los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocality, eventStatus]);

  // Filtrado general
  const filteredEvents = EVENTS.filter(
    (event) =>
      (selectedLocality === "all" || event.locality === selectedLocality) &&
      event.status === eventStatus
  );

  // Paginación
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Manejadores
  const handleLogoClick = () => {
    setSelectedEvent(null);
    setSelectedLocality("all");
    setEventStatus("upcoming");
    setActiveView("list");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <Header onLogoClick={handleLogoClick} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {selectedEvent ? (
          <EventDetail
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
          />
        ) : (
          <>
            <AdSpace type="horizontal" />

            <FilterSection
              selected={selectedLocality}
              onSelect={setSelectedLocality}
            />

            {/* Controles de Vista y Estado */}
            <div
              className="mb-6 flex flex-col items-start justify-between gap-4
                border-b border-gray-200 pb-4 lg:flex-row lg:items-center"
            >
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setEventStatus("upcoming")}
                  className={`rounded-md px-4 py-2 text-sm font-bold
                    transition-all ${
                      eventStatus === "upcoming"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Próximos planes
                </button>
                <button
                  onClick={() => setEventStatus("past")}
                  className={`rounded-md px-4 py-2 text-sm font-bold
                    transition-all ${
                      eventStatus === "past"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Histórico
                </button>
              </div>

              <div
                className="flex rounded-lg border border-gray-200 bg-white p-1
                  shadow-sm"
              >
                <button
                  onClick={() => setActiveView("list")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2
                    text-sm font-semibold transition-colors ${
                      activeView === "list"
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <List size={18} /> Lista
                </button>
                <button
                  onClick={() => setActiveView("calendar")}
                  className={`flex items-center gap-2 rounded-md px-4 py-2
                    text-sm font-semibold transition-colors ${
                      activeView === "calendar"
                        ? "bg-[#DA121A] text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Calendar size={18} /> Calendario
                </button>
              </div>
            </div>

            {activeView === "list" ? (
              <>
                <div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2
                    lg:grid-cols-3"
                >
                  {paginatedEvents.map((event, index) => (
                    <React.Fragment key={event.id}>
                      <EventCard event={event} onClick={setSelectedEvent} />
                      {/* Publicidad intercalada cada 3 eventos en desktop */}
                      {(index + 1) % 3 === 0 &&
                        index !== paginatedEvents.length - 1 && (
                          <div
                            className="col-span-1 md:col-span-2 lg:col-span-3"
                          >
                            <AdSpace type="horizontal" />
                          </div>
                        )}
                    </React.Fragment>
                  ))}

                  {filteredEvents.length === 0 && (
                    <div
                      className="col-span-full rounded-2xl border border-dashed
                        border-gray-300 bg-white py-16 text-center"
                    >
                      <Search
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <h3 className="text-lg font-medium text-gray-900">
                        No hay eventos para esta selección
                      </h3>
                      <p className="mt-1 text-gray-500">
                        Prueba a cambiar de localidad o revisa el histórico.
                      </p>
                    </div>
                  )}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-gray-300 p-2
                        transition-colors hover:bg-gray-50
                        disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-600">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-lg border border-gray-300 p-2
                        transition-colors hover:bg-gray-50
                        disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <CalendarView
                events={filteredEvents}
                onClickEvent={setSelectedEvent}
              />
            )}
          </>
        )}
      </main>

      {/* Footer / Newsletter persistente */}
      <footer
        className="mt-12 border-t border-gray-200 bg-white py-12"
        id="newsletter"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div
            className="mb-4 inline-flex items-center justify-center rounded-full
              bg-red-50 p-3 text-[#DA121A]"
          >
            <Mail size={24} />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            No te pierdas ningún plan
          </h3>
          <p className="mb-6 text-gray-600">
            Recibe nuestra newsletter semanal con los mejores eventos de La
            Rioja Baja directamente en tu email.
          </p>
          <form className="mx-auto flex max-w-lg flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Tu correo electrónico..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3
                focus:border-transparent focus:ring-2 focus:ring-[#DA121A]
                focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#DA121A] px-6 py-3 font-semibold
                text-white shadow-md transition-colors hover:bg-red-700"
            >
              Suscribirme
            </button>
          </form>

          <div
            className="mx-auto mt-8 flex max-w-lg flex-col items-center
              rounded-xl border border-gray-200 bg-gray-50 p-6"
          >
            <Megaphone size={24} className="mb-2 text-gray-400" />
            <h4 className="mb-1 font-bold text-gray-900">
              ¿Tienes un negocio en la zona?
            </h4>
            <p className="mb-4 text-center text-sm text-gray-600">
              Ayúdanos a mantener este proyecto vivo patrocinando la web o
              nuestra newsletter semanal.
            </p>
            <button
              className="rounded-lg border border-gray-300 bg-white px-4 py-2
                text-sm font-semibold text-gray-700 shadow-sm transition-colors
                hover:bg-gray-50"
            >
              Ver opciones de patrocinio
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-900">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900">
              Facebook
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            © 2026 Agenda Rioja Baja. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
