
Note, for the builds to work, you must have already created a CMK with the alias `alias/sl_api_cmk`.

You also need to use that CMK to encrypt the DB username and password.

Store those encryption strings in the terraform variables.

## TODO

* add DB connection to lambdas
* db init sql script
    * test locally on docker

### extended todos

* terraform encryption at rest (s3) 
