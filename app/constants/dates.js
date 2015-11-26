/**
 *
 * Date things
 *
 */


Winter: 21st December - 20th March
Spring: 21st March - 20th June
Summer: 21st June - 20th September
Autumn: 21st September - 21st December

// Astronomical calendar seasons
// for northern hemisphere
const SEASONS = [
{idx: 0, season: 'winter', begin: {mth: 11, day: 21}, end: {mth: 2, day: 20}},
{idx: 1, season: 'spring', begin: {mth: 2, day: 21}, end: {mth: 5, day: 20}},
{idx: 2, season: 'summer', begin: {mth: 5, day: 21}, end: {mth: 9, day: 20}},
{idx: 3, season: 'autumn', begin: {mth: 9, day: 21}, end: {mth: 11, day: 20}}
];

function getSeason() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  const season = SEASONS.filter((r) => {
    return (month >= r.begin.mth && day >= r.begin.day) && (month <= r.end.mth && day <= r.end.day);
  });
}


export const function datesForTime(t) {
  let start = null;
  let end = null;

  switch(t) {
  case 'week-now':
    start = "date_trunc('week', now()) - interval '1 day'";
    end = "date_trunc('week', now()) + interval '6 days'";
    break;
  case 'week-last':
    start = "date_trunc('week', now() - interval '1 week') - interval '1 day'";
    end = "date_trunc('week', now() - interval '1 week') + interval '6 days'";
    break;
  case 'month-now':
    start = "date_trunc('month', now())";
    end = "date_trunc('month', now() + interval '1 month')";
    break;
  case 'month-last':
    start = "date_trunc('month', now() - interval '1 month')";
    end = "date_trunc('month', now() - interval '1 month') + interval '1 month'";
    break;
  case 'year-now':
    start = "date_trunc('year', now())";
    end = "date_trunc('year', now() + interval '1 year')";
    break;
  case 'year-last':
    start = "date_trunc('year', now() - interval '1 year')";
    end = "date_trunc('year', now() - interval '1 year') + interval '1 year'";
    break;
  default:
    start = "date_trunc('week', now()) - interval '1 day'";
    end = "date_trunc('week', now()) + interval '6 days'";
    break;
  }

  return `(photos.metadata->>'created_time')::int >= cast(extract(epoch from (${start})) as integer) AND (photos.metadata->>'created_time')::int < cast(extract(epoch from (${end})) as integer)`;
}