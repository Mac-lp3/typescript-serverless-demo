resource "aws_lambda_function" "get_drugs_lambda" {
   function_name = "getDrugs"
   s3_bucket = var.lambda_code_bucket
   s3_key    = var.get_drugs_object_key
   source_code_hash = var.get_drugs_object_key

   handler = "main.handle"
   runtime = "nodejs12.x"

   role = var.general_lambda_role_arn
}

