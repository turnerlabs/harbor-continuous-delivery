provider "aws" {
  region  = "${var.region}"
  profile = "${var.profile}"
}

module "harbor" {
  source = "git::ssh://git@bitbucket.org/EATurner/harbor-terraform?ref=v1.0//sandbox"
}

resource "aws_db_instance" "postgres" {
  identifier             = "${var.instance_name}"
  name                   = "${var.database_name}"
  storage_type           = "${var.storage_type}"
  allocated_storage      = "${var.allocated_storage}"
  engine                 = "${var.engine_type}"
  engine_version         = "${var.engine_version}"
  instance_class         = "${var.instance_class}"
  username               = "${var.database_user}"
  password               = "${var.database_password}"
  multi_az               = "${var.is_multi_az}"
  db_subnet_group_name   = "${aws_db_subnet_group.postgres.name}"
  vpc_security_group_ids = ["${aws_security_group.postgres.id}"]

  tags {
    application = "${var.tag_application}"
    team        = "${var.tag_team}"
    environment = "${var.tag_environment}"
  }
}

resource "aws_db_subnet_group" "postgres" {
  name        = "${var.tag_name}"
  description = "subnet-group-${var.tag_team}-${var.tag_application}-${var.tag_environment}"
  subnet_ids  = ["${split(",", module.harbor.subnets)}"]

  tags {
    application = "${var.tag_application}"
    team        = "${var.tag_team}"
    environment = "${var.tag_environment}"
  }
}

resource "aws_security_group" "postgres" {
  vpc_id = "${module.harbor.vpc_id}"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    application = "${var.tag_application}"
    team        = "${var.tag_team}"
    environment = "${var.tag_environment}"
  }
}
