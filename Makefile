#SHELL := /bin/bash
DATED=$(shell date '+%Y-%m-%d')

all: glop

glop:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show/latest && git pull"

latest:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show/latest && git pull"

dated-latest:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show \
	&& mkdir -p $(DATED) \
	&& cp -r latest/www/ $(DATED)"


show:
	ssh studio.stamen.com "cd /var/www/com.stamen.studio/openspaces/show \
	&& mkdir -p $(DATED) \
	&& cp -r --parents fractured_atlas/play $(DATED)"