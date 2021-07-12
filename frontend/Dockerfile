FROM tiangolo/node-frontend:latest as builder

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM nginx:1.17.1-alpine

# RUN rm -rf /etc/nginx/conf.d
# COPY ./nginx/nginx.conf /etc/nginx

COPY --from=builder /app/build/ /usr/share/nginx/html

COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]