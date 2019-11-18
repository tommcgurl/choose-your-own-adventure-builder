# base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

EXPOSE 3000 9229

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm ci
COPY . /app

# start app
CMD ["npm", "start"]