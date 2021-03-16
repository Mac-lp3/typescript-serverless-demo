resource "aws_api_gateway_rest_api" "slapi_gateway" {
  name = "slapi_gateway"

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "slapi api gateway"
  }
}

resource "aws_api_gateway_resource" "slapi_gateway_drugs_resource" {
  rest_api_id = aws_api_gateway_rest_api.slapi_gateway.id
  parent_id   = aws_api_gateway_rest_api.slapi_gateway.root_resource_id
  path_part   = "drugs"
}

resource "aws_api_gateway_method" "slapi_gateway_drugs_method" { 
  rest_api_id   = aws_api_gateway_rest_api.slapi_gateway.id
  resource_id   = aws_api_gateway_resource.slapi_gateway_drugs_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_drugs_lambda" {
  rest_api_id = aws_api_gateway_rest_api.slapi_gateway.id
  resource_id = aws_api_gateway_resource.slapi_gateway_drugs_resource.id
  http_method = aws_api_gateway_method.slapi_gateway_drugs_method.http_method

  integration_http_method = "POST" # lambda can only be invoked by POST (see terraform documentation)
  type                    = "AWS_PROXY"
  uri                     = var.get_drugs_invoke_arn
}

# resource "aws_api_gateway_method" "slapi_gateway_root" {
#   rest_api_id   = aws_api_gateway_rest_api.slapi_gateway.id
#   resource_id   = aws_api_gateway_rest_api.slapi_gateway.root_resource_id
#   http_method   = "ANY"
#   authorization = "NONE"
# }

# resource "aws_api_gateway_integration" "root_lambda" {
#    rest_api_id = aws_api_gateway_rest_api.slapi_gateway.id
#    resource_id = aws_api_gateway_method.slapi_gateway_root.resource_id
#    http_method = aws_api_gateway_method.slapi_gateway_root.http_method

#    integration_http_method = "GET"
#    type                    = "AWS_PROXY"
#    uri                     = var.get_drugs_lambda_arn
# }
