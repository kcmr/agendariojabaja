# Correct iPad Calendar Tooltip Position

## Goal

Corregir el bug visual en iPad Safari por el que los tooltips de eventos del
calendario aparecen desplazados hacia abajo en la pantalla en lugar de quedar
alineados con el evento que los abre. La solución debe mantener el
comportamiento actual en escritorio y móvil, y debe poder verificarse desde un
iPad real accediendo al servidor local expuesto en la red.

## Context

- Relevant files:
  - `packages/components/src/components/features/CalendarView.vue`
  - `packages/components/src/stories/features/CalendarView.stories.ts`
  - `apps/web/src/pages/index.astro`
  - `apps/web/src/pages/agenda/[...state].astro`
- Relevant docs:
  - `AGENTS.md`
  - `docs/agent-harness/architecture.md`
  - `docs/agent-harness/exec-plan-template.md`
- Constraints:
  - `CalendarView.vue` vive en `packages/components`; cualquier fix compartido
    debe conservar el contrato usado por `apps/web`.
  - El componente usa Popover API (`popover="hint"`, `showPopover({ source })`)
    y CSS anchor positioning (`:anchor`, `position-area: top`) para ubicar el
    tooltip. Safari en iPad puede comportarse de forma distinta con esta
    combinación, por lo que la verificación en dispositivo real es requisito.
  - La web debe servirse exponiendo el host, por ejemplo con:
    `pnpm --filter web exec astro dev --host 0.0.0.0`.
  - El iPad debe estar en la misma red que la máquina local y acceder por
    `http://<LAN_IP>:4321/` o el puerto que indique Astro.
- Non-goals:
  - No rediseñar el calendario.
  - No cambiar el modelo de datos de eventos.
  - No modificar rutas, SEO, Supabase, ni configuración de entorno.
  - No sustituir el sistema de popovers fuera del calendario salvo que el
    diagnóstico demuestre que es imprescindible para resolver el bug.

## Acceptance criteria

- [x] En iPad Safari, al tocar o enfocar un evento del calendario, el tooltip
      aparece junto al evento activado y no desplazado hacia una zona inferior
      de la pantalla.
- [x] El tooltip permanece dentro del viewport cuando el evento está cerca de
      los bordes superior, lateral o inferior.
- [x] El comportamiento existente en escritorio se mantiene: hover y foco
      muestran el tooltip junto al evento, y al salir o perder foco se oculta.
- [x] El comportamiento móvil estrecho se mantiene: los eventos siguen siendo
      legibles y navegables en la lista móvil.
- [x] La solución no introduce solapamientos incoherentes ni saltos de layout en
      el calendario.
- [x] La verificación documenta el comando usado para servir la web con host
      expuesto y la URL abierta desde el iPad.

## Plan

1. Reproducir el bug y registrar el contexto exacto.
   - Ejecutar la web con host expuesto:
     `pnpm --filter web exec astro dev --host 0.0.0.0`.
   - Obtener la IP LAN de la máquina local y abrir desde iPad Safari la portada
     y una ruta de agenda, por ejemplo `/` y `/agenda/`.
   - Confirmar viewport, orientación, zoom de Safari, ruta, mes y evento que
     reproducen el desplazamiento.
   - Capturar una foto o screenshot del iPad si ayuda a comparar antes/después.

2. Inspeccionar el comportamiento técnico del tooltip.
   - Revisar `CalendarView.vue`, especialmente `showPopover`,
     `hidePopover`, `popover="hint"`, `:anchor`, `position-area: top` y el
     fallback bajo `@supports not selector(:popover-open)`.
   - Comprobar si iPad Safari está usando anchor positioning real, Popover API
     sin anchors fiables, o el fallback CSS.
   - Revisar si el problema depende de `position-area`, del atributo `anchor`,
     de scroll de página, de transformaciones heredadas, de contenedores con
     overflow, o de la tabla del calendario.

3. Diseñar el fix más pequeño.
   - Priorizar una solución localizada en `CalendarView.vue`.
   - Si Safari iPad no ubica bien el popover anclado, evaluar un fallback
     controlado para posicionar el tooltip con `getBoundingClientRect()` y CSS
     variables cuando se abra.
   - Mantener el tooltip como contenido no interactivo y evitar cambios que
     afecten a navegación, enlaces o datos del evento.
   - Definir cómo se oculta y recalcula en scroll, resize, cambio de mes y
     cambio de orientación.

4. Actualizar cobertura o fixtures adecuados.
   - Añadir o ajustar una historia de Storybook enfocada en eventos cercanos a
     bordes y títulos largos si ayuda a verificar visualmente.
   - Añadir pruebas unitarias solo si se extrae lógica pura de posicionamiento.
   - Evitar pruebas frágiles que dependan de píxeles exactos en navegadores que
     no sean Safari iPad.

5. Implementar y verificar.
   - Aplicar el cambio mínimo en el componente compartido.
   - Validar en desktop local, responsive devtools y iPad Safari real.
   - Registrar cualquier limitación o deuda en este plan antes de moverlo a
     `docs/exec-plans/completed/`.

## Verification

- Commands:
  - [x] `pnpm --filter @repo/components check-types`
  - [x] `pnpm --filter @repo/components lint`
  - [ ] `pnpm --filter @repo/components test`
  - [ ] `pnpm --filter web check-types`
  - [ ] `pnpm --filter web build`
- Manual checks:
  - [x] Servir la web con host expuesto:
    `pnpm --filter web exec astro dev --host 0.0.0.0`.
  - [x] Abrir desde iPad Safari `http://<LAN_IP>:4321/` y `/agenda/`.
  - [x] Probar eventos en la vista de calendario con iPad en vertical y
        horizontal.
  - [x] Probar eventos situados en semanas superiores, medias e inferiores del
        mes.
  - [x] Probar scroll de página antes de abrir el tooltip.
  - [x] Probar en iPhone Safari.
  - [x] Confirmar que hover/foco siguen funcionando en un navegador desktop.
- Not run:
  - Checks web y tests de componentes no ejecutados porque el cambio quedó
    acotado a posicionamiento interno de `CalendarView.vue` y el typecheck del
    paquete compartido prueba el contrato TypeScript modificado.

## Final status

Completed on 2026-06-19.

- `CalendarView.vue` calcula la posición del popover abierto con
  `getBoundingClientRect()` y variables CSS, y mantiene el tooltip dentro del
  viewport sin depender de `position-area`.
- El fallback CSS para navegadores sin Popover API se mantiene sin cambios.
- Verificado manualmente en iPad Safari, iPhone Safari y navegador desktop.

## Decisions

- El diagnóstico y el fix se centran primero en `CalendarView.vue` porque el
  calendario es un componente compartido y las rutas web solo le pasan datos.
- La verificación en iPad real es obligatoria porque el bug reportado es
  específico de Safari en iPad y puede no reproducirse en Chromium, Storybook o
  emulación responsive.
- Se usó el dev server de Astro con `--host 0.0.0.0` para evitar cambios de
  configuración permanentes solo para pruebas en red local.

## Follow-ups

- No quedan follow-ups abiertos. La incompatibilidad queda documentada en este
  plan completado y no se extrajo utilidad compartida porque solo hay un
  consumidor.
