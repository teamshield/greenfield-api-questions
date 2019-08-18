
# Green Field Questions and Answers API Documentation

<!-- INSERT GIF OF OVERALL APP HERE -->

A two person dev team created ...

<p align="center">
<img src="documentation/logos.png">
</p>

> - 🐘 Postgres
> - 🐋 Docker

## Table of Contents

- [Green Field Questions and Answers API Documentation](#green-field-questions-and-answers-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Installing-Dependencies](#installing-dependencies)
  - [Technologies-Used](#technologies-used)
  - [Requirements](#requirements)
  - [Routes](#routes)
  - [API](#api)
  - [Engineering Journal](#engineering-journal)
  - [Notes](#notes)

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

## Routes

> Some notes here

| Request Type | Endpoint                                            | Returns                                                        | Status |
| ------------ | --------------------------------------------------- | -------------------------------------------------------------- | ------ |
| GET          | /qa/:productId                                      | An object containing questions related to a particular product | 200    |
| GET          | /qa/:questionId/answers                             | An object cotaining answers related a question                 | 200    |
| POST         | /qa/:productId                                      |                                                                | 201    |
| POST         | /qa/:questionId/answers                             |                                                                | 201    |
| PUT          | /qa/question/:**question_id**/helpful               |                                                                | 204    |
| PUT          | /qa/question/:question_id/report                    |                                                                | 204    |
| PUT          | /qa/answer/:answer_id/helpful                       |                                                                | 204    |
| PUT          | /qa/:questionId/answers/qa/answer/:answer_id/report |                                                                | 204    |

## API

> Comments here

## Engineering Journal

> Detailed notes on the project including recorded times at different intervals can be found viewed via my [engineering journal](https://gist.github.com/cali3192/e8b73d36df18e0c1cd5519d0e940983a#file-2019-08-05-md)

## Notes

> **IMPORTANT: development vs. production**
