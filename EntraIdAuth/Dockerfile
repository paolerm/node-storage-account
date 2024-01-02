FROM node:18

WORKDIR /usr/src/app

COPY package*.json app.js ./

# copy credentials file
COPY .env ./

# copy example trace file
COPY trace-example.zip ./

RUN npm install

EXPOSE 3000
CMD ["node", "app.js"]