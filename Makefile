build_dir = bin/build

build_lambda_layers:
	rm -rf $(build_dir)/nodejs $(build_dir)/nodejs.zip
	cp package.json package-lock.json $(build_dir)/nodejs

# TODO make dynamic for each lambda
build_get_drugs:
	rm -rf $(build_dir)/getDrugs $(build_dir)/getDrugs.zip 
	tsc
	# cp package.json package-lock.json $(build_dir)/getDrugs
	# cd $(build_dir)/getDrugs && npm install --only=production
	cd $(build_dir)/getDrugs && zip -r ../getDrugs.zip *