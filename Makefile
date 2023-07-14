.PHONY: run
run:
	make pull && make build

.PHONY: build
build:
	docker-compose -f docker-compose.yml up -d --build --remove-orphans

.PHONY: up
up:
	docker-compose -f docker-compose.yml upgit a

.PHONY: reset
reset:
	docker-compose -f docker-compose.yml up -d

.PHONY: down
down:
	docker-compose -f docker-compose.yml down

.PHONY: pull
pull:
	git pull
