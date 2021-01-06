output "db_vpd_arn" {
  value = aws_vpc.slapi_vpc.arn
}

output "db_subnet_a_id" {
  value = aws_subnet.slapi_db_subnet_a.id
}

output "db_subnet_b_id" {
  value = aws_subnet.slapi_db_subnet_b.id
}