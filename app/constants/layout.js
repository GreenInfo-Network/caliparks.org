/**
 *
 * Layout
 *
 */

export const MOBILE_BREAKPOINT = 768;

export function getTwoColumnWidth(windowWidth, padding = 20) {
  const available = Math.max(0, windowWidth - padding);

  if (windowWidth > 684) {
    return [350, available - 350];
  }

  return [320, available - 320];
}

export function getTwoColumnWidthPercent(windowWidth, padding = 20) {
  if (windowWidth < MOBILE_BREAKPOINT) return [100, 100];

  const available = Math.max(0, windowWidth - padding);

  if (!available) return [0, 0];

  if (windowWidth > 684) {
    return [(350 / available) * 100, ((available - 350) / available) * 100];
  }

  return [(320 / available) * 100, ((available - 320) / available) * 100];
}
