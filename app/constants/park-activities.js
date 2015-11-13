/**
 *
 * Park Activities
 *
 */

/**
*
* Supported activities
*
* @assetname - is the name of the activity in
*  the DB table `activity`. Replacing spaces with
*  underscores because it also is used to reference
*  SVG & IMG assets.
*
*/
export const activities = [
  {
    name: 'Backpacking',
    assetname: 'backpacking',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Ball fields',
    assetname: 'ball_fields',
    feature: true,
    clrGroup: 'orange'
  },
  {
    name: 'Basketball',
    assetname: 'basketball',
    feature: true,
    clrGroup: 'orange'
  },
  {
    name: 'Biking',
    assetname: 'biking',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Board sports',
    assetname: 'boardsports',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: 'Boating',
    assetname: 'boating',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: 'Camping',
    assetname: 'camping',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Covered picnic tables',
    assetname: 'covered_picnic_tables',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Dogs',
    assetname: 'dogs',
    feature: true,
    clrGroup: 'purple'
  },
  {
    name: 'Fishing',
    assetname: 'fishing',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: 'Hiking',
    assetname: 'hiking',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Museums & historical sites',
    assetname: 'historicalsite',
    feature: true,
    clrGroup: 'brown'
  },
  {
    name: 'Horseback riding',
    assetname: 'horsebackriding',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Kayaking / Canoeing',
    assetname: 'kayakingcanoeing',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: 'OHV',
    assetname: 'ohv',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Playgrounds',
    assetname: 'playground',
    feature: true,
    clrGroup: 'purple'
  },
  {
    name: 'Rustic cabins',
    assetname: 'rusticcabins',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: 'Snow sports',
    assetname: 'snowsports',
    feature: true,
    clrGroup: 'lgtBlue'
  },
  {
    name: 'Swimming',
    assetname: 'swimming',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: 'Tennis',
    assetname: 'tennis',
    feature: true,
    clrGroup: 'orange'
  },
  {
    name: 'Wildlife watching',
    assetname: 'wildlifewatching',
    feature: true,
    clrGroup: 'green'
  }
];

export const colorGroups = {
  green: '#4CAF50',
  blue: '#2196F3',
  lgtBlue: '#00BCD4',
  purple: '#9C27B0',
  orange: '#FF9F00',
  brown: '#8C6D62'
};

export const helpers = {
  iconprefix: '/main.svg#activity-',
  imgpath: 'assets/images/activities/',
  imageURL: imageURL,
  iconURL: iconURL,
  sanitize: sanitize,
  title: title
};

function imageURL(activity, aspectRatio = 'rect') {
  const postfix = (aspectRatio === 'rect') ? '_rect.jpg' : '_square.jpg';
  return [helpers.imgpath, sanitize(activity), postfix].join('');
}

function iconURL(activity) {
  return [helpers.iconprefix, sanitize(activity)].join('');
}

function sanitize(activity) {
  return activity.split(' ').join('_');
}

function title(activity) {
  const sanitized = sanitize(activity);

  const result = activities.filter((row) =>{
    return row.assetname === sanitized;
  });

  if (result.length) return result[0].name;
  return activity;
}
