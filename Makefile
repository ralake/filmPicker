BIN = ./node_modules/.bin

.PHONY: bootstrap build start server deploy

start: build server

server:
	node index.js

build:
	$(BIN)/webpack -p --progress --colors

build-production:
	NODE_ENV=production $(BIN)/webpack -p --progress --colors

bootstrap:
	npm install

deploy: build-production
	gcloud app deploy
