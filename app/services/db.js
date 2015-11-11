'use strict';

import pg from 'pg';
import util from 'util';
import {Promise} from 'es6-promise';
import {queries} from './queries/parks';

const DATABASE_URL = process.env.DATABASE_URL || null;

/**
 * Wrapper for database calls
 * @param  {String} queryName - Name of query defined in queries
 * @param  {Object} options
 * @return Query promise
 */
export function query(queryName, options) {
  options = options || [];

  return new Promise((resolve, reject) => {
    if (!DATABASE_URL) return reject('No DATABASE_URL!');
    if (!queryName in queries) return reject('No query method for {%s}', queryName);

    pg.connect(DATABASE_URL, (err, client, done) => {
      if (err) {
        done();
        return reject(err);
      }

      let {query, opts} = queries[queryName](options);

      return client.query(query, opts, (err, result) => {
        done();

        if (err) {
          return reject(err);
        }

        resolve(util.isArray(result.rows) ? result.rows : []);
      });
    });
  });
};
