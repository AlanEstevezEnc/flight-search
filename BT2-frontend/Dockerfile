FROM node:20
WORKDIR /app
#COPY flight-app/package*.json ./
COPY flight-app/package.json flight-app/yarn.lock ./
WORKDIR /app/flight-app
#RUN npm install
RUN yarn install
COPY flight-app/ ./
EXPOSE 5173
#CMD ["npm","run","dev"]
CMD ["yarn","vite","dev"]

