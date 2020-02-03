FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --silent

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
