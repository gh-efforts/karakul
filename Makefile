test:
	yarn && \
	ENDPOINT=https://karakul-center-dev.caprover.byteark.cn \
	yarn build && \
	yarn --production && \
	yarn start

up:
	docker build --rm -t karakul-app-image:latest .
	docker rm karakul-app-test -f || true
	docker run --rm -d --env-file ./.env.development -p 3000:3000 --name karakul-app-test karakul-app-image