build_dir = bin/build

# TODO just for getDrug stuff.
# TODO make this dynamicfor each function
build_get_drugs:
	rm -rf $(build_dir)/getDrugs $(build_dir)/getDrugs.zip 
	tsc
	# cp package.json package-lock.json $(build_dir)/getDrugs
	# cd $(build_dir)/getDrugs && npm install --only=production
	cd $(build_dir)/getDrugs && zip -r ../getDrugs.zip *