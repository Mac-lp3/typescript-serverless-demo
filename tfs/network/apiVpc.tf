resource "aws_vpc" "sl_api_vpc" {
  cidr_block = "10.0.0.0/26"

  tags = {
    name = "sl_api_db_subnet"
  }
}

resource "aws_subnet" "sl_api_db_subnet_a" {
  vpc_id            = aws_vpc.sl_api_vpc.id
  cidr_block        = "10.0.0.0/28"
  availability_zone = "us-east-1a"

  tags = {
    name = "sl_api_db_subnet_a"
  }
}

resource "aws_subnet" "sl_api_db_subnet_b" {
  vpc_id            = aws_vpc.sl_api_vpc.id
  cidr_block        = "10.0.0.16/28"
  availability_zone = "us-east-1b"

  tags = {
    name = "sl_api_db_subnet_b"
  }
}

output "db_vpd_arn" {
  value = aws_vpc.sl_api_vpc.arn
}

output "db_subnet_a_id" {
  value = aws_subnet.sl_api_db_subnet_a.id
}

output "db_subnet_b_id" {
  value = aws_subnet.sl_api_db_subnet_b.id
}