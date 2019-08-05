[![Build Status](https://travis-ci.org/teamuru/greenfieldApp.svg?branch=master)](https://travis-ci.org/teamuru/greenfieldApp)

# Green Field App Documentation

<!-- INSERT GIF OF OVERALL APP HERE -->

A two person dev team created ...

<p align="center">
<img src="documentation/logos.png">
</p>

> - 🐘 Postgres
> - 🐋 Docker

## Table of Contents

1. [Installing Dependencies](#Installing-Dependencies)
2. [Technologies Used](#Technologies-Used)
3. [Requirements](#Requirements)
4. [Notes](#Notes)

## Installing-Dependencies

> Navigate to the root directory and run the following scripts to run locally

- `npm install` - install dependencies
- `npm start` - start the server in production
- `npm run build` - webpack build the front end

> Alternatively run the following script to simultaneously run the server and build

- `npm run dev` - concurrently start the server and build the front end

* Navigate to http://localhost:4000/

## Technologies-Used

> Back-End

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
  <!-- - [Postgres] -->
  <!-- - [Mongo] -->

> Continuous Integration

- [Travis](https://travis-ci.org/)

> Testing Suite

- [Jest](https://jestjs.io/docs/en/api)

## Requirements

Ensure that the following modules are installed before running `npm install`

- Node v10.13.0 or higher

## API

> Comments here

## Notes

> **IMPORTANT: development vs. production**
>
> - Some notes go here

| Request Type | /qa/:productId | /qa/:questionId/answers | /qa/:questionId/answers \*w/photos |     |
| ------------ | -------------- | ----------------------- | ---------------------------------- | --- |
| GET          | 2743.463ms     | 8582.042ms              | 14571.786ms                        |     |
| POST         |                |                         |                                    |     |
|              |                |                         |                                    |     |
