# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
