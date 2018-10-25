FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent && mv node_modules ../
RUN npm install --production
COPY . .
EXPOSE 3000
CMD yarn start