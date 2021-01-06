output "db_password" {
  value       = data.aws_kms_secrets.database_creds.plaintext["db_password"]
  sensitive   = true
}

output "db_username" {
  value       = data.aws_kms_secrets.database_creds.plaintext["db_username"]
  sensitive   = true
}

output "db_password_enc" {
    value     = var.db_password_enc
    sensitive = true
}

output "db_username_enc" {
    value     = var.db_username_enc
    sensitive = true
}