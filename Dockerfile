FROM mhart/alpine-node AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --registry 'https://registry.npm.taobao.org'
COPY . .
RUN yarn build
RUN yarn --production --registry 'https://registry.npm.taobao.org'

FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js /app/antd.value.less /app/cssloder.js /app/version.js ./
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
