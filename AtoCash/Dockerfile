FROM node:12.14-alpine AS build
WORKDIR /app
RUN npm cache clean --force

COPY . .
RUN npm install

ARG configuration=production
RUN npm run build -- --output-path=./dist/ang --configuration $configuration


FROM nginx:latest AS ngi

COPY --from=build /app/dist/ang /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
