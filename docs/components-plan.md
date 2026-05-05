
# Plan de implementación de componentes Vue — Agenda Rioja Baja

## Estado actual de componentes

| Componente | Estado | Notas |
|---|---|---|
| `Card.vue` | ✅ Parcial | Existe; falta footer slot poblado. Tags de tipo/precio sobre imagen excluidas por ahora |
| `Tag.vue` | ✅ Completo | Funciona, 2 variantes (`default`, `muted`) |
| `Button.vue` | ⚠️ Reescribir | Usa colores hardcodeados (`#1ea7fd`), sin tokens de diseño |
| Resto | ❌ Por crear | — |

---

## Estrategia de exports del paquete `@repo/ui`

Se usará el patrón **wildcard subpath exports** (Opción C) para evitar tocar `package.json` al añadir cada componente nuevo, sin necesidad de un barrel file:

```json
// packages/ui/package.json
"exports": {
  "./theme.css": "./src/theme.css",
  "./*": "./src/components/*.vue"
}
```

- Import en consumidor: `import Button from '@repo/ui/Button'`
- No hay barrel file → tree-shaking limpio
- No hay que modificar `package.json` al añadir un componente nuevo
- La superficie pública queda implícitamente limitada a `src/components/`

---

## Tokens CSS nuevos en `theme.css`

Añadir bajo la sección `@theme` existente:

```css
/* Ad spaces */
--color-surface-ad: var(--color-gray-100);
--color-border-ad: var(--color-gray-200);
--color-content-ad-label: var(--color-gray-400);
--color-content-ad-body: var(--color-gray-500);
--color-content-ad-cta: var(--color-gray-700);
```

---

## Componentes a crear / reescribir

### 1. `Button.vue` — reescritura completa

**Archivo:** `packages/ui/src/components/Button.vue`

- Siempre renderiza `<button type="button">`
- **Variantes:** `brand` (rojo relleno), `outline` (borde gris), `ghost` (sin borde/fondo), `facebook` (azul, para "Ver fuente original")
- **Tamaños:** `sm`, `md` (default), `lg`
- **Estado disabled:** atributo nativo + clases visuales
- **Soporte icono:** slot `icon-left` y `icon-right` opcionales
- Todos los colores via tokens de diseño (`--color-surface-brand`, etc.)

**Stories (`Button.stories.ts`):**
- `Default`, `Brand`, `Outline`, `Ghost`, `Facebook`
- `Disabled`, `Large`, `Small`
- `WithIconLeft`, `WithIconRight`
- **play function:** verifica que el click emite el evento y que disabled bloquea el evento

---

### 2. `ButtonLink.vue` — nuevo, SSR-friendly

**Archivo:** `packages/ui/src/components/ButtonLink.vue`

- Siempre renderiza `<a href="...">` → **componente estático, sin JS en Astro**
- Comparte la lógica de clases con `Button` a través de un composable `useButtonClasses` en `src/composables/useButtonClasses.ts`
- Mismas variantes y tamaños que `Button`
- Props: `href`, `variant`, `size`, `external` (añade `target="_blank" rel="noopener noreferrer"` automáticamente)

**Stories (`ButtonLink.stories.ts`):**
- `Brand`, `Outline`, `Ghost`, `Facebook`
- `ExternalLink`

---

### 3. `Badge.vue` — nuevo

**Archivo:** `packages/ui/src/components/Badge.vue`

Complementa `Tag` con forma pill (`rounded-full`) y soporte para iconos:

- **Variantes:**
  - `category` → fondo verde tint, texto verde (`--color-category`)
  - `price` → fondo amarillo tint, texto amarillo oscuro (`--color-highlight-text`)
  - `brand` → fondo rojo tint, texto rojo (`--color-brand`)
  - `muted` → fondo gris, texto gris
- Slot por defecto para contenido
- Slot `icon` (izquierda) para iconos Lucide u otros

**Stories (`Badge.stories.ts`):**
- `Category`, `Price`, `Brand`, `Muted`
- `WithIcon` (usando un SVG inline de ejemplo)

---

### 4. `AdSpace.vue` — nuevo

**Archivo:** `packages/ui/src/components/AdSpace.vue`

Espacio reservado para publicidad con dos variantes de tamaño:

- **Variantes:**
  - `horizontal` → altura `h-32`, formato 728×90
  - `vertical` → altura `h-64`, formato 300×250
- Muestra: label "Espacio Patrocinado" + texto de dimensiones
- Botón "Anúnciate aquí" (con icono Megaphone) visible **solo en hover** (transición opacity)
- Usa tokens: `--color-surface-ad`, `--color-border-ad`, `--color-content-ad-*`
- Semántica: `<aside aria-label="Espacio publicitario">`

**Stories (`AdSpace.stories.ts`):**
- `Horizontal`, `Vertical`

---

### 5. `EmptyState.vue` — nuevo

**Archivo:** `packages/ui/src/components/EmptyState.vue`

Estado vacío reutilizable cuando no hay resultados:

- Props: `title` (string), `description` (string)
- Slot `icon` para icono personalizado (por defecto: icono de búsqueda)
- Borde punteado, fondo `--color-surface-card`
- `col-span-full` por defecto para ocupar todo el ancho en grids

**Stories (`EmptyState.stories.ts`):**
- `Default` (sin icono custom), `WithCustomIcon`

---

### 6. `LocalityChip.vue` — nuevo

**Archivo:** `packages/ui/src/components/LocalityChip.vue`

Botón cuadrado con imagen, gradiente y nombre de localidad para el filtro de municipios:

- Props: `id` (string), `name` (string), `img` (string), `selected` (boolean)
- **Estado selected:** `scale-95` + ring `--color-brand` con offset 2px
- **Estado hover:** `scale-105` + `opacity-100`
- Emite: `select(id: string)`
- Semántica: `<button>` con `aria-pressed` para el estado selected
- Gradiente de overlay: `from-black/80 via-black/30 to-transparent`
- Imagen lazy loading

**Stories (`LocalityChip.stories.ts`):**
- `Default`, `Selected`, `AllLocalities` (grid con varias chips)
- **play function:** click emite `select` con el id correcto

---

### 7. `Pagination.vue` — nuevo

**Archivo:** `packages/ui/src/components/Pagination.vue`

Paginación accesible con navegación prev/next:

- Props: `currentPage` (number), `totalPages` (number)
- Emite: `pageChange(page: number)`
- Botones con iconos `ChevronLeft` / `ChevronRight` (Lucide, embebidos como SVG inline)
- Texto central: "Página X de Y"
- Estado `disabled` nativo en botones cuando está en primera/última página
- `aria-label` en botones, `aria-current="page"` en el indicador
- Semántica: `<nav aria-label="Paginación">`

**Stories (`Pagination.stories.ts`):**
- `Default` (página 2 de 5), `FirstPage`, `LastPage`, `SinglePage`
- **play functions:** click en "siguiente" y "anterior", verificar que disabled bloquea

---

### 8. `Grid.vue` — nuevo

**Archivo:** `packages/ui/src/components/Grid.vue`

Contenedor de layout responsivo para las cards de eventos:

- **Columnas por defecto:** 1 (mobile) → 2 (tablet `md:`) → 3 (desktop `lg:`)
- Prop `cols` opcional para override: `1 | 2 | 3 | 4`
- Prop `gap` opcional: `sm | md (default) | lg`
- Semántica: renderiza `<ul>` con `<li>` wrapper para cada ítem del slot
- Slot por defecto para cards/ítems

**Stories (`Grid.stories.ts`):**
- `Default` (3 cols con 6 cards mock), `TwoColumns`, `WithAdSpace` (AdSpace intercalada)

---

### 9. `Tabs.vue` — nuevo (componente compuesto)

**Archivos:**
- `packages/ui/src/components/Tabs.vue` (contenedor)
- `packages/ui/src/components/TabItem.vue` (pestaña individual)

Tabs accesibles con dos estilos visuales:

**`TabGroup.vue` (o `Tabs.vue`):**
- Prop `variant`: `segment` | `toggle`
- Prop `modelValue` (v-model): string/number con el id del tab activo
- Emite `update:modelValue`
- Rol ARIA: `tablist`

**Variante `segment`** (estilo "Próximos planes / Histórico"):
- Contenedor con `bg-surface-muted rounded-lg p-1`
- Tab activo: `bg-surface-card text-content-heading shadow-sm rounded-md`
- Tab inactivo: `text-content-muted hover:text-content-body`

**Variante `toggle`** (estilo "Lista / Calendario"):
- Contenedor con borde exterior `border-border-default rounded-lg p-1`
- Tab activo con icono: `bg-surface-brand text-content-on-brand rounded-md`
- Tab activo sin icono especial: `bg-surface-muted text-content-heading`
- Soporte para icono + label en cada tab

**`TabItem.vue`:**
- Props: `value` (id), `label` (string)
- Slot `icon` opcional
- Rol ARIA: `tab`, `aria-selected`, `aria-controls`

**Stories (`Tabs.stories.ts`):**
- `Segment`, `Toggle`, `ToggleWithIcons`
- **play function:** cambio de tab activo via click

---

## Estructura de archivos final

```
packages/ui/src/
├── composables/
│   └── useButtonClasses.ts       ← lógica compartida Button/ButtonLink
├── components/
│   ├── AdSpace.vue               ← nuevo
│   ├── Badge.vue                 ← nuevo
│   ├── Button.vue                ← reescritura
│   ├── ButtonLink.vue            ← nuevo
│   ├── Card.vue                  ← existente (sin cambios)
│   ├── EmptyState.vue            ← nuevo
│   ├── Grid.vue                  ← nuevo
│   ├── Link.vue                  ← existente (sin cambios)
│   ├── LocalityChip.vue          ← nuevo
│   ├── Pagination.vue            ← nuevo
│   ├── TabItem.vue               ← nuevo
│   ├── Tabs.vue                  ← nuevo
│   └── Tag.vue                   ← existente (sin cambios)
└── stories/
    ├── AdSpace.stories.ts        ← nuevo
    ├── Badge.stories.ts          ← nuevo
    ├── Button.stories.ts         ← reescritura
    ├── ButtonLink.stories.ts     ← nuevo
    ├── Card.stories.ts           ← existente (sin cambios)
    ├── EmptyState.stories.ts     ← nuevo
    ├── Grid.stories.ts           ← nuevo
    ├── LocalityChip.stories.ts   ← nuevo
    ├── Pagination.stories.ts     ← nuevo
    ├── Tabs.stories.ts           ← nuevo
    └── Tag.stories.ts            ← existente (sin cambios)
```

---

## Orden de implementación

1. **Tokens** → `theme.css` (base para todo)
2. **Exports** → `package.json` con wildcard pattern
3. **`useButtonClasses` composable** → base para Button y ButtonLink
4. **`Button.vue`** + **`ButtonLink.vue`** + stories
5. **`Badge.vue`** + stories
6. **`AdSpace.vue`** + **`EmptyState.vue`** + stories (más simples)
7. **`LocalityChip.vue`** + stories
8. **`Pagination.vue`** + stories
9. **`Grid.vue`** + stories
10. **`Tabs.vue`** + **`TabItem.vue`** + stories

---

## Notas de accesibilidad

- Todos los botones interactivos tienen `aria-label` o texto visible
- `LocalityChip` usa `aria-pressed` para el estado seleccionado
- `Pagination` usa `<nav>`, botones con `aria-label`, y `aria-disabled` sincronizado con el atributo `disabled`
- `Tabs` sigue el patrón WAI-ARIA Tabs (`tablist`, `tab`, `tabpanel`)
- `AdSpace` usa `<aside>` con `aria-label`
- Imágenes con `alt` descriptivo o vacío si son decorativas
- `@storybook/addon-a11y` ya instalado — ejecutará checks automáticos en todas las stories

---

## Tests en Storybook

El setup actual (`storybookTest` + Vitest + Playwright headless) convierte automáticamente cada story en un test de smoke. Las stories con `play` function añaden tests de interacción:

| Story con play function | Qué verifica |
|---|---|
| `Button` — Primary | Click emite evento; disabled bloquea |
| `LocalityChip` — Default | Click emite `select` con id correcto |
| `Pagination` — Default | Siguiente/anterior cambian página; disabled en extremos |
| `Tabs` — Segment/Toggle | Click en tab cambia el activo |

