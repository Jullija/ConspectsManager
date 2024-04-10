FROM node:alpine

WORKDIR /frontend

COPY package* .
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build

EXPOSE 80

ENTRYPOINT ["serve"]
CMD ["-s", "build", "-l", "80"]