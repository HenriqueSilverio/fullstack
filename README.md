# Full-Stack JavaScript

## Requirements

- [NodeJS](https://nodejs.org/) `^12`
- [MongoDB](https://www.mongodb.com/download-center/community) `^4`

## Usage

**1.** Clone to your machine, and `cd` into it:
```
git clone git@github.com:HenriqueSilverio/fullstack.git && cd fullstack
```

**2.** Install project dependencies:
```
npm i
```

**3.** Create a `.env` from `.env.sample`:
```
cp .env.sample .env
```

**4.** Set `JWT_SECRET` environment variable:
```
JWT_SECRET="your-super-secret-key-here"
```

There are two commands available:

- `npm start`: Start server with [Nodemon](https://nodemon.io/) to development and debug.
- `npm test`: Runs [Mocha](http://mochajs.org/) tests suite.

## REST API

Verb | URI                 | Description
-----|---------------------|---------------------
POST | `/api/v1/login`     | User authentication
POST | `/api/v1/users`     | User sign up
GET  | `/api/v1/users`     | Users list (`admin`'s only)
GET  | `/api/v1/users/:id` | User profile details
