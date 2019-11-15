# Running CYOAB Locally

## Table of contents

- [Technologies](#Technologies-used)
- [Setting up your local machine](#Setting-up-your-local-machine)
- [Cloning the repository and installing packages](#Cloning-the-repository-and-installing-packages)
- [Setting up and running the server](#Setting-up-and-running-the-server)
- [Starting the client](#Starting-the-client)
- [Modifying the database / creating migrations](#Modifying-the-database-/-creating-migrations)
- [Deploying the Node Server Application to Heroku](#Deploying-the-Node-Server-Application-to-Heroku-☁️)

## Technologies used

- Server: Express running on Node, Apollo Server, GraphQL, Passport, pg (PostgreSQL package), db-migrate, JSON Web Token, and UUID
- Client: React, React Router, Redux, Redux Loop, Draft.js, localForage, and Reselect
- Database: PostgreSQL

_[Return to top](#Running-CYOAB-Locally)_

## Set up using 🐳 Docker
The Docker container contains all of the necessary dependencies to run the
backend server including, PostgreSQL and Node. This means you don't have to have
them installed locally! It also makes it easy to move our backend server to a 
hosting platform.

1. Install [Docker](https://docs.docker.com/)

2. Run `docker-compose build` from the `/server` directory.
    - This will create the docker images on your machine

3. Run `docker-compose up` to start the server
    - From now on this is the only command you will need to run to start the server

Check out the `Dockerfile` and `docker-compose.yml` to see how this is set up.

## Setting up your local machine

- Be sure you have installed [Git](https://git-scm.com/downloads), [Node](https://nodejs.org/en/) 10.x, and [PostgreSQL](https://www.postgresql.org/download/) 11
- Instructions for setting up a PostgreSQL database can be found [here](https://www.postgresql.org/docs/11/tutorial-install.html)
- We also recommend the [pgAdmin](https://www.pgadmin.org/download/) tool for direct interaction with the database

_[Return to top](#Running-CYOAB-Locally)_

## Cloning the repository and installing packages

Open a terminal and input the following:

```bash
$ git clone https://github.com/tommcgurl/choose-your-own-adventure-builder.git
```

After the repo is cloned, navigate to the /server folder and install the server packages:

```bash
$ cd choose-your-own-adventure-builder/server
$ npm install
```

After server packages are installed, install the client packages:

```bash
$ cd ../client
$ npm install
```

_[Return to top](#Running-CYOAB-Locally)_

## Setting up and running the server

You'll need to create a .env file in the /server folder with the following environment variables

```
PORT=3002
GOOGLE_CLIENT_ID=<google client ID>
GOOGLE_CLIENT_SECRET=<google client secret>
FACEBOOK_APP_ID=<facebook app id>
FACEBOOK_APP_SECRET=<facebook app secret>
NODE_ENV=development
CLIENT_URL=http://localhost:3000
PGUSER=<the username you set up for postgres>
PGPASSWORD=<the password you set up for postgres>
PGHOST=localhost
PGDATABASE=<what you named the development database>
PGPORT=<the port your development database runs on>
TOKEN_SECRET=<anything you want, this is what the jwt token service uses for login authentication>
```

Now, you should be able to start the server. From the /server folder:

```bash
$ npm run dev
```

This will check for and run any necessary migrations for the PostgreSQL database, seed the database with sample adventures if the database is empty, and then run the server with nodemon monitoring.

_[Return to top](#Running-CYOAB-Locally)_

## Starting the client

With the server running, you can now open a new terminal, navigate to the /client folder, and then start the client:

```bash
$ npm start
```

_[Return to top](#Running-CYOAB-Locally)_

## Modifying the database / creating migrations

If you are making changes to the database, you will need to create a new migration in order to handle those changes.

We've made a nifty script that will make it easy for you to create new migrations, passing the name of the migration as an option.

```bash
$ npm run create-migration -- <migration name>
```

This will create a new migration file in `/server/db/migrations` with the given name, prefixed with a date stamp. Inside the migration file is where you will create or drop tables, add columns, etc. We are using the `db-migrate` package whose [documentation can be found here](https://db-migrate.readthedocs.io/en/latest/API/SQL/).

It is not necessary to run `migrate-up` manually; the `npm run dev` script will automatically migrate up for you.

_[Return to top](#Running-CYOAB-Locally)_

## Deploying the Node Server Application to Heroku ☁️

We are hosting the [`server` Node application in Heroku](https://dashboard.heroku.com/apps/cyoab-server). 
We do this by only pushing a _subtree_ to Heroku, in this case,
server/. 

Heroku then uses the `heroku.yml` file which tells it to build our application using the `Dockerfile`🐳  in the `server/` directory.

In order to push a new build you must:

1. Create a Remote for Heroku. We will name this remote `heroku-server` since it's a subtree and we will eventually have
a `heroku-client`.

    * Run the following command to create a remote for Heroku:

      ```bash
      heroku git:remote -a cyoab-server && git remote rename heroku heroku-server
      ```
2. Push the latest changes to Heroku
    * If you are in the **root** directory run
      ```bash
      npm run push-heroku:server
      ```
    * If you are in the **server** directory run
      ```bash
      npm run push-heroku
      ````
