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
  source = var.get_drugs_zip_path
  etag   = filemd5(var.get_drugs_zip_path)
}

resource "aws_s3_bucket_object" "nodejs_zip" {
  bucket = aws_s3_bucket.lambda_code.bucket
  key = "layers/nodejs.zip"
  acl    = "private"
  source = var.nodejs_zip_path
  etag   = filemd5(var.nodejs_zip_path)
}

output "lambda_code_bucket" {
    value = aws_s3_bucket.lambda_code.bucket
}

output "get_drugs_object_key" {
    value = aws_s3_bucket_object.get_drugs_zip.key
}

output "nodejs_object_key" {
    value = aws_s3_bucket_object.nodejs_zip.key
}