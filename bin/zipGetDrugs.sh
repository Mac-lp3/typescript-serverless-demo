
# clear the build dir
# TODO just for getDrug stuff
rm -rf bin/build/getDrugs bin/build/getDrugs.zip

# TODO make this dynamicfor each function
tsc

zip -rj bin/build/getDrugs.zip bin/build/getDrugs/*
