resource "aws_vpc" "slapi_vpc" {
  cidr_block = "10.0.0.0/26"

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "slapi db subnet"
  }
}

resource "aws_subnet" "slapi_db_subnet_a" {
  vpc_id            = aws_vpc.slapi_vpc.id
  cidr_block        = "10.0.0.0/28"
  availability_zone = "us-east-1a"

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "slapi db subnet a"
  }
}

resource "aws_subnet" "slapi_db_subnet_b" {
  vpc_id            = aws_vpc.slapi_vpc.id
  cidr_block        = "10.0.0.16/28"
  availability_zone = "us-east-1b"

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "slapi db subnet b"
  }
}
