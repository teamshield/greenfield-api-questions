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

## Routes

> Some notes here

| Request Type | Endpoint                                            | Returns                                                        | Status |
| ------------ | --------------------------------------------------- | -------------------------------------------------------------- | ------ |
| GET          | /qa/:productId                                      | An object containing questions related to a particular product | 200    |
| GET          | /qa/:questionId/answers                             | An object cotaining answers related a question                 | 200    |
| POST         | /qa/:productId                                      |                                                                | 201    |
| POST         | /qa/:questionId/answers                             |                                                                | 201    |
| PUT          | /qa/question/:question_id/helpful                   |                                                                | 204    |
| PUT          | /qa/question/:question_id/report                    |                                                                | 204    |
| PUT          | /qa/answer/:answer_id/helpful                       |                                                                | 204    |
| PUT          | /qa/:questionId/answers/qa/answer/:answer_id/report |                                                                | 204    |

## API

> Comments here

## Notes

> **IMPORTANT: development vs. production**
>
> - Table Sizes <sup> \*5700/12M of photos added to answers table </sup>

> Query ran to get the table sizes
> SELECT pg_size_pretty( pg_total_relation_size('tablename'));
> | Request | Endpoint | Before Indexing | After Indexing <sup>\* w/photos</sup> | Efficiency |
> | ------- | ----------------------------------------------- | --------------- | ------------------------------------- | ---------- |
> | GET | /qa/:productId | 2743.463 ms | 69.131 ms | |
> | GET | /qa/:questionId/answers | 8582.042 ms | 130.562 ms | |
> | GET | /qa/:questionId/answers <sup> \*w/photos </sup> | 14571.786 ms | NA | |
> | | | | |

<!--
| Request Type | /qa/:productId | /qa/:questionId/answers | /qa/:questionId/answers \*w/photos |     |
| ------------ | -------------- | ----------------------- | ---------------------------------- | --- |
| GET          | 2743.463ms     | 8582.042ms              | 14571.786ms                        |     |
| POST         |                |                         |                                    |     |
|              |                |                         |                                    |     | -->

### Recorded Sizes of Tables

> Before/After Indexing

> Initial State: Non-Indexed Table

| Table Name  | Size (before ) | Size (after ) |
| ----------- | -------------- | ------------- |
| questions   | 534 MB         | 610 MB        |
| answers     | 1886 MB        | 2151 MB       |
| photos      | 16 kB          |               |
| new_answers | 2120 MB        | 2385 MB       |

> Before/After Partial Indexing

> Initial State: Indexed Table

| Table Name  | Size (before) | Size (After) |
| ----------- | ------------- | ------------ |
| questions   | 610 MB        | 757 MB       |
| new_answers | 2385 MB       | 2637 MB      |

### Recorded Times Queries on the Postgres Database

> Before/After Indexing

> Initial State: Non-Indexed Table

| Queries on the Postgres Database                   | Before      | After    | Efficiency |
| -------------------------------------------------- | ----------- | -------- | ---------- |
| `SELECT ... FROM questions WHERE product_id = ...` | 2144.990 ms | 0.736 ms | 2914x      |
| `SELECT ... FROM answers WHERE question_id = ...`  | 5967.155 ms | 2.460 ms | 2425x      |
| `SELECT ...` with new_answers table                | 1065.861 ms | 2.405 ms | 443x       |

> Partials on both

| Queries on the Postgres Database                   | Before   | After    | Efficiency |
| -------------------------------------------------- | -------- | -------- | ---------- |
| `SELECT ... FROM questions WHERE product_id = ...` | 0.736 ms | 0.097 ms |            |
| `SELECT ...` with new_answers table                | 2.405 ms | 0.158 ms |            |

### Recorded Times after queries on endpoints

> Indexed tables from above with "WHERE reported = 0" added for questions

| Request | Endpoint                | Indexed    | + Partial  | Efficiency |
| ------- | ----------------------- | ---------- | ---------- | ---------- |
| GET     | /qa/:productId          | 69.131 ms  | 64.397 ms  |            |
| GET     | /qa/:questionId/answers | 130.562 ms | 120.413 ms |            |

> Indexed tables from above with "WHERE reported = 0" added for new_answers

| Request | Endpoint                | Indexed    | + Partial | Efficiency |
| ------- | ----------------------- | ---------- | --------- | ---------- |
| GET     | /qa/:productId          | 64.397 ms  | 41.473 ms |            |
| GET     | /qa/:questionId/answers | 120.413 ms | 74.695 ms |            |

- get questions before answers indexed: 6372.986ms
- get new_answers after indexed on questions and new_Answers 67.831ms
