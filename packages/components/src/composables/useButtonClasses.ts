export type ButtonVariant = "brand" | "outline" | "text";
export type ButtonSize = "md" | "lg";

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export function useButtonClasses(options: ButtonClassOptions) {
  const { variant = "brand", size = "md", disabled = false } = options;

  const base = `inline-flex items-center justify-center gap-2 
    font-semibold rounded-lg leading-none cursor-pointer transition-colors 
    focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-offset-2 focus-visible:ring-ring-brand`;

  const variants: Record<ButtonVariant, string> = {
    brand:
      "bg-surface-brand text-content-on-brand hover:bg-surface-brand-hover shadow-md",
    outline:
      "bg-transparent border border-border-strong text-content-heading hover:bg-surface-subtle",
    text: "bg-transparent text-content-muted hover:text-content-heading p-0 font-medium",
  };

  const sizes: Record<ButtonSize, string> = {
    md: "text-sm px-4 py-3",
    lg: "text-base px-6 py-3",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return [base, sizes[size], disabledClasses, variants[variant]]
    .filter(Boolean)
    .join(" ");
}
