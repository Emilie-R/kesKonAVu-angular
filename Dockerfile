# Stage 1

# node.js v12.14 minimum
FROM node:12.18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:latest

COPY --from=build-step /app/dist/keskonavu-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80