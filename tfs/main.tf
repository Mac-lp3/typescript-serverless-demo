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

module api_iam {
  source = "./iam"
}

module s3_buckets {
  source = "./s3"
}

module api_lambdas {
  source = "./lambda"
  general_lambda_role_arn = module.api_iam.general_lambda_role_arn
  lambda_code_bucket = module.s3_buckets.lambda_code_bucket
  get_drugs_object_key = module.s3_buckets.get_drugs_object_key
}
