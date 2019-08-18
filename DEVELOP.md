# Running CYOAB Locally

## Technologies used

- Server: Express running on Node, Apollo Server, GraphQL, Passport, pg (PostgreSQL package), db-migrate, JSON Web Token, and UUID
- Client: React, React Router, Redux, Redux Loop, Draft.js, localForage, and Reselect
- Database: PostgreSQL

## Setting up your local machine

- Be sure you have installed [Git](https://git-scm.com/downloads), [Node](https://nodejs.org/en/) 10.x, and [PostgreSQL](https://www.postgresql.org/download/) 11
- Instructions for setting up a PostgreSQL database can be found [here](https://www.postgresql.org/docs/11/tutorial-install.html)
- We also recommend the [pgAdmin](https://www.pgadmin.org/download/) tool for direct interaction with the database

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

## Starting the client

With the server running, you can now open a new terminal, navigate to the /client folder, and then start the client:

```bash
$ npm start
```

## Modifying the database / creating migrations

If you are making changes to the database, you will need to create a new migration in order to handle those changes.

We've made a nifty script that will make it easy for you to create new migrations, passing the name of the migration as an option.

```bash
$ npm run create-migration -- <migration name>
```

This will create a new migration file in `/server/db/migrations` with the given name, prefixed with a date stamp. Inside the migration file is where you will create or drop tables, add columns, etc. We are using the `db-migrate` package whose [documentation can be found here](https://db-migrate.readthedocs.io/en/latest/API/SQL/).

It is not necessary to run `migrate-up` manually; the `npm run dev` script will automatically migrate up for you.
