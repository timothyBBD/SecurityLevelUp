FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY tsconfig.json /app

RUN yarn install --production

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "api:prod" ]