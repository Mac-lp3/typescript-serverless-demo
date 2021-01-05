resource "aws_db_subnet_group" "api_db_subnet_group" {
  name       = "db_subnet_group"
  subnet_ids = [var.db_subnet_a_id, var.db_subnet_b_id]

  tags = {
    name = "SL API DB subnet group"
  }
}

resource "aws_db_instance" "api_db" {
  db_subnet_group_name = aws_db_subnet_group.api_db_subnet_group.name
  allocated_storage    = 20
  engine               = "mariadb"
  engine_version       = "10.3"
  instance_class       = "db.t2.micro"
  name                 = "slapi"
  username             = var.db_username
  password             = var.db_password
}

output api_db_name {
    value = aws_db_instance.api_db.name
}