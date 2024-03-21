FROM node:alpine

WORKDIR /frontend

COPY package* .
RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]