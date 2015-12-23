import {queries as Parks} from './parks';
import {queries as Activities} from './activities';
import _ from 'lodash';

export const queries = _.assign({}, Parks, Activities);