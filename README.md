# About

This project is a simple set up for a serverless architecture written in TypeScript.

It includes an API gateway, MariaDB RDS instance, and a GET lambda function.

## Notes

Note, for the builds to work, you must have already created a CMK with the alias `alias/sl_api_cmk`.

You also need to use that CMK to encrypt the DB username and password.

Store those encryption strings in the terraform variables.

# build/deploy

Lambdas use a shared layer.

## TODO

* check RDS network
    * ACL
    * sec groups
* check lambda -> rds connection
* route 53
* lambda db subnet access
* refine lambdas, tsc, and test set up
* db init sql script
    * test locally on docker

### extended todos

* terraform encryption at rest (s3) 
