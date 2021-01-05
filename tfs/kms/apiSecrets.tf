data "aws_kms_secrets" "database_creds" {
  
  secret {
    name    = "db_username"
    payload = "AQICAHiFdTpZAHCp4rBT2KpukE7loBbZKQWUcOAgVUNIQE1QhgEQ9m8juvlNh2VNk8ErGuxrAAAAYzBhBgkqhkiG9w0BBwagVDBSAgEAME0GCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMK3F7Y61Q5cHKWBVcAgEQgCAtMZyg378Y/LJ2wKvBuC2LQ3BbzIDNGYZYlJnHYFIc8w=="
  }

  secret {
    name    = "db_password"
    payload = "AQICAHiFdTpZAHCp4rBT2KpukE7loBbZKQWUcOAgVUNIQE1QhgGzC+JDPz3qCqNzKfQe8/mTAAAAZzBlBgkqhkiG9w0BBwagWDBWAgEAMFEGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMpRBrbdMNRGPuI/xnAgEQgCSS5Hc4fHEbUppTn4rU0MjipYN8KFDZBUzL6YMYBgI1ZnhSK4w="
  }

}

output "db_password" {
  value       = data.aws_kms_secrets.database_creds.plaintext["db_password"]
  sensitive   = true
}

output "db_username" {
  value       = data.aws_kms_secrets.database_creds.plaintext["db_username"]
  sensitive   = true
}
