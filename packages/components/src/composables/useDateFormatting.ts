import { computed, toValue, type MaybeRefOrGetter } from "vue";

/**
 * Composable to format a date string into both ISO and human-readable formats.
 *
 * @param dateSource - A string or a ref containing a date string.
 * @returns An object with computed isoDate (YYYY-MM-DD) and humanDate (D de MMMM de YYYY).
 */
export function useDateFormatting(dateSource: MaybeRefOrGetter<string>) {
  const isoDate = computed(() => {
    const value = toValue(dateSource);
    const date = new Date(value);

    if (isNaN(date.getTime())) return value;

    return date.toISOString().split("T")[0];
  });

  const humanDate = computed(() => {
    const value = toValue(dateSource);
    const date = new Date(value);

    if (isNaN(date.getTime())) return value;

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  return {
    isoDate,
    humanDate,
  };
}
