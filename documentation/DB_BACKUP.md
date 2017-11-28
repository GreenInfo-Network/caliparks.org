## Database Backup and Restore

### Taking a Database Backup

Taking a dump of all the database tables, would be done with a command similar to this.
* Replace the `$DATABASE_XXX` params with the actual DB connections credentials.
* Replace the `$YYYYMMDD` in the output filename, with the real date or other identifier.

```
pg_dump --verbose \
    -U $DATABASE_USER -h $DATABASE_HOST \
    --table='public.*' \
    --file=caliparks_db_backup_$YYYYMMDD.sql --format=p \
    --clean --if-exists --no-privileges \
    $DATABASE_BASE
```

The process takes about 30 minutes, and the resulting SQL file is about 27 GB. When compressed with `gzip -9` this becomes 5.4 GB. When compressed with `zip -9` this becomes 5.5 GB. Then stow this backup file someplace safe.

**Don't Forget the Functions**

Separately from this dump of table data, also note the `caliparks_db_functions.sql` file which contains the custom functions also necessary.


### Restoring the Database Dump

The backup file (dump file) does not have database creation commands, and you will need to create the database and user yourself. This is intentional, to facilitate restoring into a separate database without accidentally damaging the production database.

To create a new database and user to log into it, log in as the *postgres* superuser, and run commands like this:
```
sudo su postgres -c psql
    CREATE USER newcaliparks PASSWORD 'supertopsecret';
    CREATE DATABASE newcaliparks OWNER newcaliparks;
    \c newcaliparks
    CREATE EXTENSION postgis;
    ALTER TABLE spatial_ref_sys  OWNER TO newcaliparks;
    ALTER VIEW geography_columns OWNER TO newcaliparks;
    ALTER VIEW geometry_columns  OWNER TO newcaliparks;
    ALTER VIEW raster_columns    OWNER TO newcaliparks;
    ALTER VIEW raster_overviews  OWNER TO newcaliparks;
    \q
```

Depending on your database server configuration, the *postgres* superuser may be allowed only to log in from localhost and not remotely. Keep that in mind when trying to create the new database.

Restore into this database, the custom functions used by Caliparks  (again, explicitly using a non-superuser to avoid any possibility of restoring to the wrong database):
```
cat caliparks_db_functions.sql | psql -U newcaliparks
```

Now restore the data tables as follows (again, explicitly using a non-superuser to avoid any possibility of restoring to the wrong database):
```
cat caliparks_db_backup_YYYYMMDD.sql | psql -U newcaliparks
```

A bunch of *role does not exist* messages is expected and okay, if your new database doesn't use the same username as the old one.

The runtime on this will vary widely depending on hardware. Expect at least 30 minutes.
