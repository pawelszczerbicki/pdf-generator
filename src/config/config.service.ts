export const getProp = (key: string, fallback?: string) => process.env[key] || fallback;