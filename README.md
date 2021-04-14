# About

This project is a simple set up for a serverless architecture written in TypeScript.

It includes an API gateway, MariaDB RDS instance, and a GET lambda function.

## Notes

For the builds to work, you must have already created a CMK with the alias `alias/sl_api_cmk`.

Use that CMK to encrypt the DB username and password.

Store those encrypted strings in the terraform variables.

# test/build/deploy

Tests use `npm`, build/deploys use `make`.

Unit test with `npm run test`. 

Integration test with `npm run test:int` (starts and sets up a local MariaDB docker container).

NPM packages and shared Lambda code is deployed as a lambda layer, which must get built first.

## TODO

* tests: set env vars in package.json 
* add init sql to lambda layer
* deploy sql with lambda layer
* add init sql path var to init lambda

* HTTP query params in lambda
* confirm/test response body serialization
* route 53
* sqs event queue

### extended todos

* terraform encryption at rest (s3) 
