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
import React from 'react';
import {FormattedMessage, defineMessages} from 'react-intl';

const messages = defineMessages({
  backpacking: {
    id: 'act_backpacking',
    defaultMessage: 'Backpacking'
  },
  ball_fields: {
    id: 'act_ball_fields',
    defaultMessage: 'Ball fields'
  },
  basketball: {
    id: 'act_basketball',
    defaultMessage: 'Basketball'
  },
  biking: {
    id: 'act_biking',
    defaultMessage: 'Biking'
  },
  boardsports: {
    id: 'act_boardsports',
    defaultMessage: 'Board sports'
  },
  boating: {
    id: 'act_boating',
    defaultMessage: 'Boating'
  },
  camping: {
    id: 'act_camping',
    defaultMessage: 'Camping'
  },
  covered_picnic_tables: {
    id: 'act_covered_picnic_tables',
    defaultMessage: 'Covered picnic tables'
  },
  dogs: {
    id: 'act_dogs',
    defaultMessage: 'Dogs'
  },
  fishing: {
    id: 'act_fishing',
    defaultMessage: 'Fishing'
  },
  hiking: {
    id: 'act_hiking',
    defaultMessage: 'Hiking'
  },
  historicalsite: {
    id: 'act_historicalsite',
    defaultMessage: 'Museums & historical sites'
  },
  horsebackriding: {
    id: 'act_horsebackriding',
    defaultMessage: 'Horseback riding'
  },
  kayakingcanoeing: {
    id: 'act_kayakingcanoeing',
    defaultMessage: 'Kayaking / Canoeing'
  },
  ohv: {
    id: 'act_ohv',
    defaultMessage: 'OHV'
  },
  playground: {
    id: 'act_playground',
    defaultMessage: 'Playgrounds'
  },
  rusticcabins: {
    id: 'act_rusticcabins',
    defaultMessage: 'Rustic cabins'
  },
  snowsports: {
    id: 'act_snowsports',
    defaultMessage: 'Snow sports'
  },
  swimming: {
    id: 'act_swimming',
    defaultMessage: 'Swimming'
  },
  tennis: {
    id: 'act_tennis',
    defaultMessage: 'Tennis'
  },
  wildlifewatching: {
    id: 'act_wildlifewatching',
    defaultMessage: 'Wildlife watching'
  }
});

export const activities = [
  {
    name: <FormattedMessage {...messages.backpacking}/>,
    assetname: 'backpacking',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.ball_fields}/>,
    assetname: 'ball_fields',
    feature: true,
    clrGroup: 'orange'
  },
  {
    name: <FormattedMessage {...messages.basketball}/>,
    assetname: 'basketball',
    feature: true,
    clrGroup: 'orange'
  },
  {
    name: <FormattedMessage {...messages.biking}/>,
    assetname: 'biking',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.boardsports}/>,
    assetname: 'boardsports',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: <FormattedMessage {...messages.boating}/>,
    assetname: 'boating',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: <FormattedMessage {...messages.camping}/>,
    assetname: 'camping',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.covered_picnic_tables}/>,
    assetname: 'covered_picnic_tables',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.dogs}/>,
    assetname: 'dogs',
    feature: true,
    clrGroup: 'purple'
  },
  {
    name: <FormattedMessage {...messages.fishing}/>,
    assetname: 'fishing',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: <FormattedMessage {...messages.hiking}/>,
    assetname: 'hiking',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.historicalsite}/>,
    assetname: 'historicalsite',
    feature: true,
    clrGroup: 'brown'
  },
  {
    name: <FormattedMessage {...messages.horsebackriding}/>,
    assetname: 'horsebackriding',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.kayakingcanoeing}/>,
    assetname: 'kayakingcanoeing',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: <FormattedMessage {...messages.ohv}/>,
    assetname: 'ohv',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.playground}/>,
    assetname: 'playground',
    feature: true,
    clrGroup: 'purple'
  },
  {
    name: <FormattedMessage {...messages.rusticcabins}/>,
    assetname: 'rusticcabins',
    feature: true,
    clrGroup: 'green'
  },
  {
    name: <FormattedMessage {...messages.snowsports}/>,
    assetname: 'snowsports',
    feature: true,
    clrGroup: 'lgtBlue'
  },
  {
    name: <FormattedMessage {...messages.swimming}/>,
    assetname: 'swimming',
    feature: true,
    clrGroup: 'blue'
  },
  {
    name: <FormattedMessage {...messages.tennis}/>,
    assetname: 'tennis',
    feature: true,
    clrGroup: 'orange'
  },
  {
    name: <FormattedMessage {...messages.wildlifewatching}/>,
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

function title(activity, formatter) {
  const sanitized = sanitize(activity);

  const result = activities.filter((row) =>{
    return row.assetname === sanitized;
  });

  if (result.length && formatter) {
    return formatter(messages[result[0].assetname]);
  }
  return activity;
}
