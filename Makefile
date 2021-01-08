build_dir = bin/build

build_nodejs_layer:
	# clean up
	rm -rf $(build_dir)/nodejs $(build_dir)/nodejs.zip
	mkdir $(build_dir)/nodejs
	
	# copy in shared/ and the npm stuff
	cp package.json package-lock.json $(build_dir)/nodejs
	cp -r $(build_dir)/src/shared $(build_dir)/nodejs/shared
	
	# cd in, npm install, and zip
	cd $(build_dir)/nodejs && npm install --only=production
	cd $(build_dir) && zip -r nodejs.zip nodejs

# TODO make dynamic for each lambda
build_get_drugs:
	rm -rf $(build_dir)/src/api/getDrugs $(build_dir)/getDrugs.zip 
	tsc
	# TODO - is there a better way?
	# replace local shared/ with lambda layer /opt/
	sed -i 's|../../shared|/opt/nodejs/shared|g'  $(build_dir)/src/api/**/*.js
	cd $(build_dir)/src/api/getDrugs && zip -r ../../../getDrugs.zip *

ensure_kms_cmk:
	# needed?

get_kms_encryption:
	# private user inputs?
	# store the alias some where?