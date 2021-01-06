resource "aws_iam_role" "slapi_general_lambda_role" {
  name = "slapi_general_lambda_role"

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

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "slapi general lambda role"
  }

}
