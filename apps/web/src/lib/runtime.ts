export const isDevelopmentMode = import.meta.env.DEV;

export const isProductionMode = import.meta.env.PROD;

export const isNonProductionMode = !isProductionMode;
