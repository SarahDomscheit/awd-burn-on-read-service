import xss from "xss";

export function sanitizeMessage(message: string): string {
  return xss(message.trim());
}
