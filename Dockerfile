FROM node:14 as base

WORKDIR /app
COPY package.json .

FROM base as development

RUN npm install
COPY . .
EXPOSE 6060
CMD [ "npm","run","start-dev" ]

FROM base as production

RUN npm install --only=production
COPY . .
EXPOSE 6060
CMD [ "npm","start" ]