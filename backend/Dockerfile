FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY tsconfig.json /app

RUN yarn install --production

COPY . /app

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]