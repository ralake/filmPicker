BIN = ./node_modules/.bin

.PHONY: bootstrap build start deploy

start:
	nodemon app

build:
	NODE_ENV=development $(BIN)/webpack -p --progress --colors --watch

build-production:
	NODE_ENV=production $(BIN)/webpack -p --progress --colors

bootstrap:
	npm install

deploy: build-production
	gcloud app deploy
