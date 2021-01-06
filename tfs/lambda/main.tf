resource "aws_lambda_layer_version" "nodejs_layer" {
  layer_name = "nodejs_layer"
  s3_bucket = var.lambda_code_bucket
  s3_key    = var.nodejs_object_key
  source_code_hash = var.nodejs_object_key

  compatible_runtimes = ["nodejs12.x"]

}

resource "aws_lambda_function" "get_drugs_lambda" {
  function_name = "getDrugs"
  s3_bucket = var.lambda_code_bucket
  s3_key    = var.get_drugs_object_key
  source_code_hash = var.get_drugs_object_key

  handler = "main.handle"
  runtime = "nodejs12.x"

  role = var.general_lambda_role_arn

  layers = [ var.nodejs_layer_arn ]

  environment {
    variables = {
      DB_USERNAME_ENC = var.db_username_enc
      DB_PASSWORD_ENC = var.db_password_enc
      DB_NAME     = var.db_name
    }
  }

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "getDrugs lambda"
  }
}
