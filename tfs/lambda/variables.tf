# external vars
variable api_gateway_exec_arn {}

variable general_lambda_role_arn {}

variable lambda_code_bucket {}

variable get_drugs_object_key {}
variable db_setup_object_key {}
variable nodejs_object_key {}

variable nodejs_layer_arn {}
variable sns_creation_topic_arn {}

variable init_sql_dir {
    default = "/opt/nodejs/sql"
}

variable db_host {}
variable db_port {}

# DB config
variable db_password_enc {
    sensitive = true
}
variable db_username_enc {
    sensitive = true
}
variable db_name {}
