/**
 *
 * Map
 *
 */

export const geojsonStyles = {
  fillColor: 'rgba(2, 122, 187,.2)',
  strokeColor: 'rgba(2, 122, 187,.7)',
  strokeWeight: 1
};

export function directionsLink(centroid) {
  const coords = centroid.coordinates;
  return 'https://www.google.com/maps/dir//' + encodeURIComponent(coords[1] + ', ' + coords[0]);
}
