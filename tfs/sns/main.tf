resource "aws_sns_topic" "rds_creation_topic" {
  name = "rds-creation-topic"
}

resource "aws_db_event_subscription" "rds_creation_subscription" {
  name             = "rds-creation-subscription"
  sns_topic        = aws_sns_topic.rds_creation_topic.arn
  
  source_type      = "db-instance"
  source_ids       = [var.api_db_id]

  event_categories = ["creation"]
}

resource "aws_lambda_permission" "sns" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = var.db_setup_function_name
  principal     = "sns.amazonaws.com"
  source_arn = aws_sns_topic.rds_creation_topic.arn
}