resource "aws_s3_bucket" "lambda_code" { 
  bucket = "slapi-lambda-code"
  acl    = "private"

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "lambda code bucket"
  }
}

resource "aws_s3_bucket_object" "get_drugs_zip" {
  bucket = aws_s3_bucket.lambda_code.bucket
  key    = "get/drugs.zip"
  acl    = "private"
  source = var.get_drugs_zip_path
  etag   = filemd5(var.get_drugs_zip_path)

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "getDrugs code zip"
  }
}

resource "aws_s3_bucket_object" "db_setup_zip" {
  bucket = aws_s3_bucket.lambda_code.bucket
  key    = "init/mariadb.zip"
  acl    = "private"
  source = var.db_setup_zip_path
  etag   = filemd5(var.db_setup_zip_path)

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "DB setup code zip"
  }
}

resource "aws_s3_bucket_object" "nodejs_zip" {
  bucket = aws_s3_bucket.lambda_code.bucket
  key    = "layers/nodejs.zip"
  acl    = "private"
  source = var.nodejs_zip_path
  etag   = filemd5(var.nodejs_zip_path)

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "nodejs layer code zip"
  }
}
