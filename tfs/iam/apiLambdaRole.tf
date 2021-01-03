resource "aws_iam_role" "sl_api_general_lambda_role" {
   name = "sl_api_general_lambda_role"

   assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

output "general_lambda_role_arn" {
  value = aws_iam_role.sl_api_general_lambda_role.arn
}