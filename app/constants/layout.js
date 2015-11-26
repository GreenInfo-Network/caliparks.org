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
