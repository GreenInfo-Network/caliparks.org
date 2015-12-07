/**
 *
 * Layout
 *
 */


export function getTwoColumnWidth(windowWidth, padding = 20) {
  const available = Math.max(0, windowWidth - padding);

  if (windowWidth > 684) {
    return [350, available - 350];
  }

  return [320, available - 320];
}

export function getTwoColumnWidthPercent(windowWidth, padding = 20) {
  const available = Math.max(0, windowWidth - padding);

  if (!available) return [0, 0];

  if (windowWidth > 684) {
    return [(350 / windowWidth) * 100, ((available - 350) / windowWidth) * 100];
  }

  return [(320 / windowWidth) * 100, ((available - 320) / windowWidth) * 100];
}
