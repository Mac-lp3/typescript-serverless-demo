resource "aws_vpc" "sl_api_vpc" {
  cidr_block = "10.0.0.0/28"

  tags = {
    name = "sl_api_db_subnet"
  }
}

resource "aws_subnet" "sl_api_db_subnet" {
  vpc_id     = aws_vpc.sl_api_vpc.id
  cidr_block = "10.0.0.0/28"

  tags = {
    name = "sl_api_db_subnet"
  }
}

output "db_vpd_arn" {
  value = aws_vpc.sl_api_vpc.arn
}

output "db_subnet_arn" {
  value = aws_subnet.sl_api_db_subnet.arn
}