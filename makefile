build-no-cache:
	docker build --no-cache -t my-moleculer:0.0.1 .

build:
	docker build -t my-moleculer:0.0.1 .

start:
	docker compose up --build --force-recreate --detach --remove-orphans

stop: 
	docker compose down