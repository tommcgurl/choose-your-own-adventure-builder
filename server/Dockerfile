# The base package for this will be the long-term-support node release
# running on alpine linux (very lightweight)
FROM node:lts-alpine

# Expose the ports we will need
# 3002 - The port we run the server on.
# 9229 - The default port for node inspector
EXPOSE 3002 9229

# Set the working directory where all RUN commands will be run from
WORKDIR /app

# Copy over our package.json and package-lock so we can run an npm install
COPY package.json /app
COPY package-lock.json /app

# We use npm ci instead of npm i. This is the prefered method when running on CI
# as it is a "clean slate" install
RUN npm ci

# Copy the rest of our files over
COPY . /app

# Wait for postgres to start
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Start things up
CMD /wait && npm run db-init && npm run dev

