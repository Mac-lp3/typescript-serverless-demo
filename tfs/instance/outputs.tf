output api_db_name {
    value = aws_db_instance.slapi_db.name
}
output api_db_id {
    value = aws_db_instance.slapi_db.id
}
output api_db_host {
    value = aws_db_instance.slapi_db.address
}
output api_db_port {
    value = aws_db_instance.slapi_db.port
}