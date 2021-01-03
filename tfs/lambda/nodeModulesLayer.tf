resource "aws_lambda_layer_version" "nodejs_layer" {
  layer_name = "nodejs_layer"
  s3_bucket = var.lambda_code_bucket
  s3_key    = var.nodejs_object_key
  source_code_hash = var.nodejs_object_key

  compatible_runtimes = ["nodejs12.x"]
}

output "nodejs_layer_arn" {
  value = aws_lambda_layer_version.nodejs_layer.arn
}
