build_dir = bin/build

test_int:
	# start mariad
	docker run --rm -p 3306:3306 --name local-maria -e MYSQL_DATABASE=slapi -e MYSQL_ROOT_PASSWORD=admin -d mariadb

	# give it a sec
	sleep 7

	# create tables
	docker exec -i local-maria sh -c 'exec mysql -uroot -padmin slapi' < sql/init/tables.sql

	# copy data files to container
	docker cp sql/data local-maria:/data

	# load data into the tables (after replacing paths)
	docker exec -i local-maria sh -c 'exec mysql -uroot -padmin slapi' < sql/init/loadDrugs.sql

	# run the tests

	# stop local-maria

build_nodejs_layer:
	# clean up
	rm -rf $(build_dir)/nodejs $(build_dir)/nodejs.zip
	mkdir $(build_dir)/nodejs

	# generate shared
	tsc
	
	# copy in shared/ and the npm stuff
	cp package.json package-lock.json $(build_dir)/nodejs
	cp -r $(build_dir)/src/shared $(build_dir)/nodejs/shared
	
	# cd in, npm install, and zip
	cd $(build_dir)/nodejs && npm install --only=production
	cd $(build_dir) && zip -r nodejs.zip nodejs

build_db_setup:
	rm -rf $(build_dir)/src/init/mariadb $(build_dir)/dbSetup.zip
	tsc
	# TODO - is there a better way?
	# replace local shared/ with lambda layer /opt/
	sed -i 's|../../shared|/opt/nodejs/shared|g'  $(build_dir)/src/init/**/*.js
	cd $(build_dir)/src/init/mariadb && zip -r ../../../dbSetup.zip *

# TODO make dynamic for each lambda
build_get_drugs:
	rm -rf $(build_dir)/src/api/getDrugs $(build_dir)/getDrugs.zip
	tsc
	# TODO - is there a better way?
	# replace local shared/ path string with AWS lambda layer /opt/ path
	sed -i 's|../../shared|/opt/nodejs/shared|g'  $(build_dir)/src/api/**/*.js
	cd $(build_dir)/src/api/getDrugs && zip -r ../../../getDrugs.zip *

ensure_kms_cmk:
	# needed?

get_kms_encryption:
	# private user inputs?
	# store the alias some where?

build_everything: build_nodejs_layer build_get_drugs
	echo "add additional functions i guess"
	echo "if you want to deploy too, run the terraform command"
