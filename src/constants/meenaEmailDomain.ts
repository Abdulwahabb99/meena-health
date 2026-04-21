export const MEENA_EMAIL_DOMAIN = "@meena-health.com";

export function buildMeenaFullEmail(localPart: string): string {
  const local = localPart.trim().toLowerCase().replace(/@/g, "");
  return `${local}${MEENA_EMAIL_DOMAIN}`;
}
