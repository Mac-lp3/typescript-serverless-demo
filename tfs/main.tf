terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  profile = "admin"
}

module api_network{
  source = "./network"
}

module api_iam {
  source = "./iam"
}

module s3_buckets {
  source = "./s3"
}

module kms_secrets {
  source                  = "./kms"
  general_lambda_role_arn = module.api_iam.general_lambda_role_arn
}

module sns {
  source                 = "./sns"
  api_db_id              = module.instances.api_db_id
  db_setup_function_name = module.api_lambdas.db_setup_function_name
}

module instances {
  source       = "./instance"
  db_subnet_a_id = module.api_network.db_subnet_a_id
  db_subnet_b_id = module.api_network.db_subnet_b_id
  db_password    = module.kms_secrets.db_password
  db_username    = module.kms_secrets.db_username
}

module api_lambdas {
  source                  = "./lambda"
  sns_creation_topic_arn  = module.sns.sns_creation_topic_arn
  nodejs_layer_arn        = module.api_lambdas.nodejs_layer_arn
  general_lambda_role_arn = module.api_iam.general_lambda_role_arn

  lambda_code_bucket   = module.s3_buckets.lambda_code_bucket
  get_drugs_object_key = module.s3_buckets.get_drugs_object_key
  db_setup_object_key  = module.s3_buckets.db_setup_object_key
  nodejs_object_key    = module.s3_buckets.nodejs_object_key
  
  db_password_enc = module.kms_secrets.db_password_enc
  db_username_enc = module.kms_secrets.db_username_enc
  db_name         = module.instances.api_db_name
  db_host         = module.instances.api_db_host
  db_port         = module.instances.api_db_port
}
