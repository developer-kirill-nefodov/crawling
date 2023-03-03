#!/usr/bin/make

include .env

docker_compose_bin= $(shell command -v docker-compose 2> /dev/null)
API_NODE_SERVICE=api
COMPOSE_CONFIG=--env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.$(ENVIRONMENT).yml

.DEFAULT_GOAL := help

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

check:
	$(docker_compose_bin) $(COMPOSE_CONFIG) config
build-img:
	$(docker_compose_bin) $(COMPOSE_CONFIG) build
up:
	make install
	$(docker_compose_bin) $(COMPOSE_CONFIG) up --no-recreate -d
up-force:
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d
up-runtime:
	$(docker_compose_bin) $(COMPOSE_CONFIG) up
down:
	$(docker_compose_bin) $(COMPOSE_CONFIG) down || true
restart:
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart
install:
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(API_NODE_SERVICE) npm install
sh-node-api:
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec $(API_NODE_SERVICE) bash
sh-run-api:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(API_NODE_SERVICE)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(API_NODE_SERVICE) bash
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(API_NODE_SERVICE)
