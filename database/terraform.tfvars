region = "us-east-1"
profile = "sandbox"

# postgres
instance_name = "harborcd"
database_name = "harborcd"
storage_type = "standard"
allocated_storage = "5"
engine_type = "postgres"
engine_version = "9.5.2"
instance_class = "db.t2.large"
database_user = "app"
is_multi_az = "false"

# tags
tag_name = "harbor cd db"
tag_environment = "prod"
tag_team = "cloud-arch"
tag_application = "harbor-continuous-delivery"
