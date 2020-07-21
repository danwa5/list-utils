FROM node:alpine

COPY . /source
WORKDIR /source
RUN yarn install
RUN yarn global add @vue/cli
RUN yarn global add http-server
RUN yarn run build
RUN ./node_modules/.bin/vue-cli-service build

CMD yarn serve --mode production
