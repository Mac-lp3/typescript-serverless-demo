# external vars
variable general_lambda_role_arn {}
variable lambda_code_bucket {}
variable get_drugs_object_key {}
variable nodejs_object_key {}
variable nodejs_layer_arn {}

# DB config
variable db_password_enc {
    sensitive = true
}
variable db_username_enc {
    sensitive = true
}
variable db_name {}