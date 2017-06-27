BIN = ./node_modules/.bin

.PHONY: bootstrap build start server

start: build server

server:
	node index.js

build:
	NODE_ENV=development $(BIN)/webpack -p --progress --colors --watch

bootstrap:
	yarn install
