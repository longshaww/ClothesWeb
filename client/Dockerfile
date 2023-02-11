FROM node:16-alpine as builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
