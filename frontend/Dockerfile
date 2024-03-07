FROM node:alpine AS builder

WORKDIR /opt/app/

COPY package.json ./
COPY yarn.lock ./

RUN yarn
COPY . .
RUN yarn build

FROM nginx
COPY --from=builder /opt/app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]