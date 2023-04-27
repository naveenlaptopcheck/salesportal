FROM node:16.20.0-alpine as builder

RUN mkdir /app
WORKDIR .


COPY . /app

RUN yarn install

RUN yarn build


FROM nginx:1.15.7-alpine

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/git/build /usr/share/nginx/html


COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
