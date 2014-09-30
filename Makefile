all: raw/hipcamp-suid.json output/uniqueActivities.json

raw:
	mkdir raw;

output:
	mkdir output;

raw/hipcamp-suid.json: raw
	curl http://$(studio-user):$(studio-pass)@studio.stamen.com/parksforward/files/hipcampFirstpass.json > raw/hipcamp-suid.json;

output/uniqueActivities.json: output
	cd bin; node extractUniqueActivities; cd ..;

clean:
	rm -rf raw; rm -rf output;
