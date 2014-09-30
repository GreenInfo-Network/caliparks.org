all: raw/hipcamp-suid.json

raw:
	mkdir raw;

output:
	mkdir output;

raw/hipcamp-suid.json: raw output
	curl http://$(studio-user):$(studio-pass)@studio.stamen.com/parksforward/files/hipcampFirstpass.json > raw/hipcamp-suid.json;
