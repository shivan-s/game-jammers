.PHONY: drun
drun:
	@echo "Building and running application" && \
	docker-compose down --remove-orphans && \
	docker-compose up --build

.PHONY: run
run:
	@echo "Running dev app" && \
	npm run dev
