output "lambda_code_bucket" {
    value = aws_s3_bucket.lambda_code.bucket
}

output "get_drugs_object_key" {
    value = aws_s3_bucket_object.get_drugs_zip.key
}

output "nodejs_object_key" {
    value = aws_s3_bucket_object.nodejs_zip.key
}