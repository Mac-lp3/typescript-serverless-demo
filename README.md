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

* pattern for running SQL in lambda vs docker
    - ~~SQL as env vars~~
    - placeholder replacement (local and cloud)
        + update to full filepath placeholder
        + how to handle the quotes? @ build/deplpoy time?
            + placeholder in SQL: no quotes, no file name.
            + new env var for data file folder path.
                + set in TF & unit tests
            + new convention: csv file names 1:1 match for tables they will populate
            + lambda does the dir + file name.

            + unit tests: read into var from file. replace @PLACEHOLDER with ?. pass in local csv path
            + int tests: read into var from file. replace @PLACEHOLDER with ?. pass in local csv path
            + lambda: read into var from file. replace @PLACEHOLDER with ?. pass in /opt/nodejs csv file path
    - incorperate into build
    - cloud testing 
        + ls & prints
        + connect & run
        + fix ACL/sec gorups/subnets/etc

* update handler to init and pass in the maria dao

* create connection pool outside of handler
    - update tests to use the new builder
    - convert get to use builder
    - update handler tests

* HTTP query params in lambda
* confirm/test response body serialization
* route 53
* sqs event queue

### extended todos

* terraform encryption at rest (s3) 
