/**
 * Calculate estimated reading time from text content.
 * Based on an average reading speed of 200 words per minute.
 */
export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
