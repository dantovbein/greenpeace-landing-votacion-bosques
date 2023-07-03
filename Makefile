.PHONY: build
build:
	docker-compose -f docker-compose.yml up -d --build --remove-orphans

.PHONY: down
down:
	docker-compose -f docker-compose.yml down
