PATH := node_modules/.bin:$(PATH)

define EXPAND_EXPORTS
export $(word 1, $(subst =, , $(1))) := $(word 2, $(subst =, , $(1)))
endef

# load .env
$(foreach a,$(shell cat .env 2> /dev/null),$(eval $(call EXPAND_EXPORTS,$(a))))
# expand PG* environment vars
$(foreach a,$(shell set -a && source .env 2> /dev/null; node_modules/.bin/pgexplode),$(eval $(call EXPAND_EXPORTS,$(a))))

define create_relation
@psql -c "\d $(subst db/,,$@)" > /dev/null 2>&1 || \
    psql -1 -f sql/$(subst db/,,$@).sql
endef

define create_extension
@psql -c "\dx $(subst db/,,$@)" | grep $(subst db/,,$@) > /dev/null 2>&1 || \
    psql -c "CREATE EXTENSION $(subst db/,,$@)"
endef

define create_function
@psql -c "\df $(subst db/,,$@)" | grep -i $(subst db/,,$@) > /dev/null 2>&1 || \
    psql -1 -f sql/$(subst db/,,$@).sql
endef

.PHONY: install

install: db/activities db/cpad_facilities db/park_stats

.PHONY: DATABASE_URL

DATABASE_URL:
	@test "${$@}" || (echo "$@ is undefined" && false)

.PHONY: db

db: DATABASE_URL
	@psql -c "SELECT 1" > /dev/null 2>&1 || \
	createdb

.PHONY: db/postgis

db/postgis: db
	$(call create_extension)

.PHONY: db/activities

db/activities: db/cpad_facilities
	$(call create_relation)

.PHONY: db/cpad_facilities

db/cpad_facilities: db/rec_facil_ca
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
