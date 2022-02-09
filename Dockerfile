
FROM node:8.4.0-alpine
EXPOSE 80
WORKDIR /
COPY . /
RUN npm install
CMD node gajax.js
