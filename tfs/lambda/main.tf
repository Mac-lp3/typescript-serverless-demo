resource "aws_lambda_layer_version" "nodejs_layer" {
  layer_name = "nodejs_layer"
  s3_bucket = var.lambda_code_bucket
  s3_key    = var.nodejs_object_key
  source_code_hash = var.nodejs_object_key

  compatible_runtimes = ["nodejs12.x"]

}

resource "aws_lambda_function" "get_drugs_lambda" {
  function_name    = "getDrugs"
  s3_bucket        = var.lambda_code_bucket
  s3_key           = var.get_drugs_object_key
  source_code_hash = var.get_drugs_object_key

  handler = "handler.handle"
  runtime = "nodejs12.x"
  role    = var.general_lambda_role_arn

  layers = [ var.nodejs_layer_arn ]

  environment {
    variables = {
      DB_USERNAME_ENC = var.db_username_enc
      DB_PASSWORD_ENC = var.db_password_enc
      DB_NAME         = var.db_name
      DB_HOST         = var.db_host
      DB_PORT         = var.db_port
    }
  }

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "getDrugs lambda"
  }
}

resource "aws_lambda_permission" "api_invoke" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.get_drugs_lambda.function_name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${var.api_gateway_exec_arn}/*/*"
}

resource "aws_lambda_function" "rds_setup" {
  function_name    = "rdsSetup"
  s3_bucket        = var.lambda_code_bucket
  s3_key           = var.db_setup_object_key
  source_code_hash = var.db_setup_object_key

  handler = "main.handle"
  runtime = "nodejs12.x"
  role    = var.general_lambda_role_arn

  layers = [ var.nodejs_layer_arn ]

  environment {
    variables = {
      DB_USERNAME_ENC = var.db_username_enc
      DB_PASSWORD_ENC = var.db_password_enc
      DB_NAME         = var.db_name
      DB_HOST         = var.db_host
      DB_PORT         = var.db_port
      INIT_SQL_DIR    = var.init_sql_dir
    }
  }
  
  # vpc_config {
  #   subnet_ids         = ["${split(",", var.subnet_ids)}"]
  #   security_group_ids = ["${var.security_group_id}"]
  # }

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "RDS setup lambda"
  }
}

resource "aws_sns_topic_subscription" "rds_setup_sub" {
  topic_arn = var.sns_creation_topic_arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.rds_setup.arn
}
