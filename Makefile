# TODO just for getDrug stuff.
# TODO make this dynamicfor each function
build_get_drugs:
	rm -rf bin/build/getDrugs bin/build/getDrugs.zip 
	tsc
	zip -rj bin/build/getDrugs.zip bin/build/getDrugs/*