# About

This project is a simple set up for a serverless architecture written in TypeScript.

It includes an API gateway, MariaDB RDS instance, and a GET lambda function.

## Notes

Note, for the builds to work, you must have already created a CMK with the alias `alias/sl_api_cmk`.

You also need to use that CMK to encrypt the DB username and password.

Store those encryption strings in the terraform variables.

# test/build/deploy

Tests use `npm`, build and deploy uses `make`.

Simple unit tests with `npm run test`. 

Integration test with a local mariadb docker image with `npm run test:int`.

NPM packages and shared Lambda code is deployed as a lambda layer, which must get built first.

## TODO

* pattern for running SQL in lambda vs docker
* create pool outside of handler
* pass in query params to lambda

* confirm/test response body serialization

* lambda for running the SQL
    * hellow world in the private subnet
    * test connection in the private subnet
    * copy over sql

* check RDS network
    * ACL
    * sec groups
* check lambda -> rds connection
* route 53

### extended todos

* terraform encryption at rest (s3) 
