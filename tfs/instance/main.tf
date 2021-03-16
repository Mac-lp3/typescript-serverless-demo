resource "aws_db_subnet_group" "slapi_db_subnet_group" {
  name       = "slapi_db_subnet_group"
  subnet_ids = [var.db_subnet_a_id, var.db_subnet_b_id]

  tags = {
    application = "slapi"
    environment = "dev"
    Name        = "slapi db subnet group"
  }
}

resource "aws_db_instance" "slapi_db" {
  db_subnet_group_name = aws_db_subnet_group.slapi_db_subnet_group.name
  allocated_storage    = 20
  engine               = "mariadb"
  engine_version       = "10.4.13"
  instance_class       = "db.t2.micro"
  name                 = "slapi"
  username             = var.db_username
  password             = var.db_password

  tags = {
    application = "slapi"
    environment = "dev"
    name        = "slapi db"
  }
}
