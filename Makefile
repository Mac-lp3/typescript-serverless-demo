build_dir = bin/build

build_lambda_layers:
	rm -rf $(build_dir)/nodejs $(build_dir)/nodejs.zip
	mkdir $(build_dir)/nodejs
	cp package.json package-lock.json $(build_dir)/nodejs
	cd $(build_dir)/nodejs && npm install --only=production
	cd $(build_dir) && zip -r nodejs.zip nodejs

# TODO make dynamic for each lambda
build_get_drugs:
	rm -rf $(build_dir)/getDrugs $(build_dir)/getDrugs.zip 
	tsc
	cd $(build_dir)/getDrugs && zip -r ../getDrugs.zip *
