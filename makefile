.PHONY: run
run:
	@echo "Building and running application" && \
	docker-compose down --remove-orphans && \
	docker-compose up --build
