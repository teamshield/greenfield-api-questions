## Overview

> The goal for today was to get a better understanding of Docker and initial set up

## Log

## 10:00 am - Dockerfile Set Up

#### Challenge/Motivation

> A dockerfile for the project was set up

### Actions Taken

> A container for node and another container for Postgres was set up

## 6:00 pm - Docker yml file

### Challenges/Motivation

> The process of building and running commands on the terminal were getting labor intensive and not sustainable for large scale projects

> A simple route was able to be served

### Actions Taken

> A docker-compose.yml was set up and run using a build command. 

## 6:00 pm - Reseeding Database

### Challenges/Motivation

> The database was found to be incomplete because some enteries were not copied over.

### Actions Taken

> Database was reseeded. Runtimes were re-evaluated and were slower given this larger dataset.

### Recorded Sizes of Tables

> Before/After Indexing

> Initial State: Indexed Table

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | 610 MB  | 757 MB  | 24.1       |
| new_answers | 2869 MB | 3134 MB | 9.2        |

> Before/After Partial Indexing

> Initial State: Indexed Table 
> Final State: + Partial Index on questions WHERE reported = 0;

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | 757 MB  | 828 MB  | 9.4        |
| new_answers | 3134 MB | 3134 MB | 0          |

> Initial State: Indexed Table + Partial Index on questions WHERE reported = 0;
> Final State: + Partial Index on new_answers WHERE report = 0;

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | 828 MB  | 900 MB  | 8.7        |
| new_answers | 3134 MB | 3386 MB | 8.1        |

### Recorded Times Queries on the Postgres Database

> Before/After Indexing

> Initial State: questions was already indexed

| Queries on the Postgres Database                   | Before       | After     | Efficiency |
| -------------------------------------------------- | ------------ | --------- | ---------- |
| `SELECT ... FROM questions WHERE product_id = ...` | 13.387 ms    | 10.171 ms | 24.0       |
| `SELECT ...` with new_answers table                | 26115.176 ms | 10.171 ms | 99.9       |


> Initial State: Indexed Table 
> Final State: + Partial Index on questions WHERE reported = 0;

| Queries on the Postgres Database                | Before    | After    | Efficiency |
| ----------------------------------------------- | --------- | -------- | ---------- |
| `SELECT * FROM questions ... product_id ...`    | 10.171 ms | 4.363 ms | 57.1       |
| `SELECT * FROM new_answers ... question_id ...` | 2.405 ms  | 2.846 ms | -18.4      |

> Partials on both

| Queries on the Postgres Database                | Before   | After    | Efficiency |
| ----------------------------------------------- | -------- | -------- | ---------- |
| `SELECT * FROM questions ... product_id ...`    | 4.363 ms | 0.097 ms | 98.0       |
| `SELECT * FROM new_answers ... question_id ...` | 2.846 ms | 0.057 ms | 99.3       |

### Recorded Times after queries on endpoints

> Indexed on questions and new_answers

| Request | Endpoint                | Before       | After      | Efficiency |
| ------- | ----------------------- | ------------ | ---------- | ---------- |
| GET     | /qa/:productId          | 16770.346 ms | 117.709 ms | 99.3       |
| GET     | /qa/:questionId/answers | 14710.889 ms | 69.198 ms  | 99.5       |

> Indexed tables from above with "WHERE reported = 0" added for questions

| Request | Endpoint                | Before     | After     | Efficiency |
| ------- | ----------------------- | ---------- | --------- | ---------- |
| GET     | /qa/:productId          | 69.131 ms  | 87.677 ms | -26.8      |
| GET     | /qa/:questionId/answers | 130.562 ms | 68.126 ms | 47.8       |

> Indexed tables from above with "WHERE reported = 0" added for new_answers

| Request | Endpoint                | Before    | After     | Efficiency |
| ------- | ----------------------- | --------- | --------- | ---------- |
| GET     | /qa/:productId          | 87.677 ms | 75.297 ms | 14.1       |
| GET     | /qa/:questionId/answers | 68.126 ms | 53.964 ms | 20.8       |




