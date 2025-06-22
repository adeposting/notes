# Directory of this Makefile
DOCKER_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
COMPOSE := docker-compose -f $(DOCKER_DIR)docker-compose.yml
SERVICE := jekyll

.PHONY: all build up down restart logs sh

all: build up

build:
	mkdir -p ../.docker/_site
	$(COMPOSE) build

up:
	$(COMPOSE) up

down:
	$(COMPOSE) down

restart:
	$(MAKE) down
	$(MAKE) up

logs:
	$(COMPOSE) logs -f $(SERVICE)

sh:
	$(COMPOSE) exec $(SERVICE) sh
