import XHR from './xhr';
import {query} from './db';
import * as File from './file';

module.exports = {
  xhr: XHR,
  db: query,
  file: File
};
