output "nodejs_layer_arn" {
  value = aws_lambda_layer_version.nodejs_layer.arn
}

output "db_setup_function_name" {
  value = aws_lambda_function.rds_setup.function_name
}

output "get_drugs_lambda_arn" {
  value = aws_lambda_function.get_drugs_lambda.arn
}

output "get_drugs_invoke_arn" {
  value = aws_lambda_function.get_drugs_lambda.invoke_arn
}
