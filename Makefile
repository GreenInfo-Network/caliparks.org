PATH := node_modules/.bin:$(PATH)

define EXPAND_EXPORTS
export $(word 1, $(subst =, , $(1))) := $(word 2, $(subst =, , $(1)))
endef

# load .env
$(foreach a,$(shell cat .env 2> /dev/null),$(eval $(call EXPAND_EXPORTS,$(a))))
# expand PG* environment vars
$(foreach a,$(shell set -a && source .env 2> /dev/null; node_modules/.bin/pgexplode),$(eval $(call EXPAND_EXPORTS,$(a))))

define create_relation
@psql -v ON_ERROR_STOP=1 -qXc "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
	psql -v ON_ERROR_STOP=1 -qX1f sql/$(subst db/,,$@).sql
endef

define create_extension
@psql -v ON_ERROR_STOP=1 -qXc "\dx $(subst db/,,$@)" | grep $(subst db/,,$@) > /dev/null 2>&1 || \
	psql -v ON_ERROR_STOP=1 -qXc "CREATE EXTENSION $(subst db/,,$@)"
endef

define create_function
@psql -v ON_ERROR_STOP=1 -qXc "\df $(subst db/,,$@)" | grep -i $(subst db/,,$@) > /dev/null 2>&1 || \
	psql -v ON_ERROR_STOP=1 -qX1f sql/$(subst db/,,$@).sql
endef

define MIGRATION_SQL_WRAPPER
CREATE FUNCTION migrate(migration_name text)
RETURNS void
AS $$$$
BEGIN
  PERFORM id FROM migrations WHERE name = migration_name;

  IF NOT FOUND THEN
	RAISE NOTICE 'Running migration: %', migration_name;

{{content}}

	INSERT INTO migrations (name) VALUES (migration_name);
  END IF;

  RETURN;
END
$$$$ LANGUAGE plpgsql;

SELECT migrate('{{name}}');

DROP FUNCTION migrate(text);
endef

export MIGRATION_SQL_WRAPPER

define migrate
	test -f sql/migrations/$(strip $(1)).sql && \
		echo "$${MIGRATION_SQL_WRAPPER//\{\{name\}\}/$(strip $(1))}" | \
		perl -pe "s/\{\{content\}\}/$$(cat sql/migrations/$(strip $(1)).sql)/" | \
		psql -qX1 > /dev/null ;
endef

define run_migrations
	@$(foreach migration,$(shell ls sql/migrations/ 2> /dev/null | sed 's/\..*//'),$(call migrate,$(migration)))
endef


.PHONY: install

install: db/all

.PHONY: DATABASE_URL

DATABASE_URL:
	@test "${$@}" || (echo "$@ is undefined" && false)

.PHONY: db

db: DATABASE_URL
	@psql -c "SELECT 1" > /dev/null 2>&1 || \
	createdb

.PHONY: db/all

db/all: db/activities db/cpad_facilities db/migrations db/park_stats

.PHONY: db/postgis

db/postgis: db
	$(call create_extension)

.PHONY: db/activities

db/activities: db/cpad_facilities
	$(call create_relation)

.PHONY: db/cpad

db/cpad: db/cpad_2014b7

.PHONY: db/cpad_2014b7

db/cpad_2014b7: db/postgis data/cpad_2014b7_superunits_name_manager_access.zip
	@psql -c "\d cpad_2014b7" > /dev/null 2>&1 || \
	ogr2ogr --config PG_USE_COPY YES \
		-t_srs EPSG:3310 \
		-nlt PROMOTE_TO_MULTI \
		-nln cpad_2014b7 \
		-lco GEOMETRY_NAME=geom \
		-lco SRID=3310 \
		-f PGDump /vsistdout/ \
		/vsizip/$(word 2,$^)/cpad_2014b7_superunits_name_manager_access.shp | pv | psql -q

.PHONY: db/cpad_facilities

db/cpad_facilities: db/rec_facil_ca db/cpad_superunits
	$(call create_relation)

.PHONY: db/cpad_facilities

db/cpad_superunits: db/cpad_2014b7
	$(call create_relation)

.PHONY: db/migrate

db/migrate: db/migrations
	$(call run_migrations)

.PHONY: db/migrations

db/migrations: db
	$(call create_relation)

.PHONY: db/park_stats

db/park_stats: db/postgis
	$(call create_relation)
	node scripts/update_park_stats.js

.PHONY: db/rec_facil_ca

db/rec_facil_ca: db/postgis data/Rec_Facil_send.zip
	@psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
	ogr2ogr --config PG_USE_COPY YES \
		-t_srs EPSG:3857 \
		-nlt PROMOTE_TO_MULTI \
		-nln $(subst db/,,$@) \
		-lco GEOMETRY_NAME=geom \
		-lco SRID=3857 \
		-lco PRECISION=false \
		-f PGDump /vsistdout/ \
		/vsizip/$(word 2,$^)/Rec_Facil_send/Rec_Facil_CA.shp | pv | psql -q

data/cpad_2014b7_superunits_name_manager_access.zip:
	@mkdir -p $$(dirname $@)
	@curl -sLf http://websites.greeninfo.org/common_data/California/Public_Lands/CPAD/dev/CPAD2014b/cpad_2014b7_superunits_name_manager_access.zip -o $@

.PHONY: migration/%

migration/%:
	@mkdir -p sql/migrations
	touch sql/migrations/$(shell date +'%Y%m%d%H%M')-$(subst migration/,,$@).sql
