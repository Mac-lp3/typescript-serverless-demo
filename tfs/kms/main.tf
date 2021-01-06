data "aws_kms_secrets" "database_creds" {
  
  secret {
    name    = "db_username"
    payload = var.db_username_enc
  }

  secret {
    name    = "db_password"
    payload = var.db_password_enc
  }

}
