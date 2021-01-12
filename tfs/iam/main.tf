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

resource "aws_iam_policy" "slapi_cmk_decrypt_policy" {
  name   = "slapi-cmk-decrypt-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "kms:ListAliases",
        "kms:ListKeys",
        "kms:DescribeKey"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }, {
      "Action": [
        "kms:Decrypt"
      ],
      "Effect": "Allow",
      "Resource": "*",
      "Condition": {
        "ForAnyValue:StringEquals": {
          "kms:ResourceAliases": "alias/sl_api_cmk"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_policy" "slapi_cloudwatch_policy" {
  name   = "slapi-cloudwatch-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }, {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:logs:us-east-1::log-group:/aws/lambda/*:*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "slapi_cmk_decrypt_policy_attachment" {
  role       = aws_iam_role.slapi_general_lambda_role.name
  policy_arn = aws_iam_policy.slapi_cmk_decrypt_policy.arn
}

resource "aws_iam_role_policy_attachment" "slapi_cloudwatch_policy_attachment" {
  role       = aws_iam_role.slapi_general_lambda_role.name
  policy_arn = aws_iam_policy.slapi_cloudwatch_policy.arn
}
