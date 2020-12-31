resource "aws_s3_bucket" "lambda_code" { 
  bucket = "sl-api-lambda-code"
  acl    = "private"

  tags = {
    name        = "lambda_code"
    app         = "sl-api"
    environment = "dev"
  }
}

resource "aws_s3_bucket_object" "get_drugs_zip" {
  bucket = aws_s3_bucket.lambda_code.bucket
  key = "get/drugs.zip"
  acl    = "private"
  source = "../bin/build/getDrugs.zip"
}

output "lambda_code_bucket" {
    value = aws_s3_bucket.lambda_code.bucket
}

output "lambda_get_drugs_key" {
    value = aws_s3_bucket_object.get_drugs_zip.key
}