output "nodejs_layer_arn" {
  value = aws_lambda_layer_version.nodejs_layer.arn
}

output "init_maria_function_name" {
  value = aws_lambda_function.init_maria.function_name
}

output "get_drugs_lambda_arn" {
  value = aws_lambda_function.get_drugs_lambda.arn
}

output "get_drugs_invoke_arn" {
  value = aws_lambda_function.get_drugs_lambda.invoke_arn
}
