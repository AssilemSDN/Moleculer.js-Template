include .env.example
export

ENV_FILE=.env.example

build-no-cache:
	docker build --no-cache -t $(DOCKER_IMAGE_NAME_APP):$(DOCKER_IMAGE_TAG_APP) .

build:
	docker build -t $(DOCKER_IMAGE_NAME_APP):$(DOCKER_IMAGE_TAG_APP) .

start:
	docker compose --env-file $(ENV_FILE) -f $(DOCKER_COMPOSE_FILE) up --build --force-recreate --detach --remove-orphans

stop: 
	docker compose --env-file $(ENV_FILE) -f $(DOCKER_COMPOSE_FILE) down