## Overview

> The goal for today was to get a better understanding of Docker and initial set up

## Log

## 10:00 am - Reseed Database locally

#### Challenge/Motivation

> After closer evaluation, some data did not carry over fully from the filestream function

### Actions Taken

> Ran through the established ETL process

## 11: 00 pm - Reconfiguring Docker 

## 12:00 pm - Added static assets in S3 buckets

## 2:00 pm - Deploy an EC2 Instance

### Challenges/Motivation

> The initial attempt in launching an EC2 instance was done on Ubuntu but it would be move difficult to save the static assets this way. 

### Actions Taken

> The instance was turned off and instaead, a seperate EC2 instance was created using Amazon's Linus shell. This offered a way to easily pass in the csv files from one service to another. 

> Some reconfiguration on the docker-compose file had to be done in order to reference the new directory located on the instance.

> Eventually, after some additional configuration/reconfiguration, the database began seeding.

> The instance when defined would only accomodate TODO: FIX 8MB so a seperate instance needed to be created which had a larger allotted storage size.

## 6:00 pm - Reseeding Database

### Challenges/Motivation

> The postgres and node image created within docker could be pulled into the instance and ran that way. There was an initial issue saying that the database was running when trying to execute the build script so that threw an error into our process.

### 7:00 pm - Seeded the Postgres Database on the EC2 Instance

> The initial lines in the schema file that dropped an existing database and then create it were removed. The database creation step was handled through the docker-compose file.

> 

### Recorded Sizes of Tables

> Before/After Indexing

> Initial State: Indexed Table

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | NA MB   | 610 MB  | 24.1       |
| new_answers | 2869 MB | 3134 MB | 9.2        |

> Before/After Partial Indexing

> Initial State: Indexed Table
> Final State: + Partial Index on questions WHERE reported = 0;

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | 757 MB  | 828 MB  | dh         |
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

| Queries on the Postgres Database                   | Before       | After    | % Increase |
| -------------------------------------------------- | ------------ | -------- | ---------- |
| `SELECT ... FROM questions WHERE product_id = ...` | NA ms        | 0.288 ms | 24.0       |
| `SELECT ...` with new_answers table                | 41301.934 ms | 1.014 ms | 99.9       |

> Initial State: Indexed Table
> Final State: + Partial Index on questions WHERE reported = 0;

| Queries on the Postgres Database                | Before   | After    | % Increase |
| ----------------------------------------------- | -------- | -------- | ---------- |
| `SELECT * FROM questions ... product_id ...`    | 0.288 ms | 0.284 ms | 57.1       |
| `SELECT * FROM new_answers ... question_id ...` | 1.014 ms | NA       | NA         |

> Partials on both

| Queries on the Postgres Database                | Before   | After    | % Increase |
| ----------------------------------------------- | -------- | -------- | ---------- |
| `SELECT * FROM questions ... product_id ...`    | 0.284 ms | 0.097 ms | 98.0       |
| `SELECT * FROM new_answers ... question_id ...` | 1.014 ms | 0.376 ms | 99.3       |

### Recorded Times after queries on endpoints

> Indexed on questions and new_answers

| Request | Endpoint                | Before       | After      | % Increase |
| ------- | ----------------------- | ------------ | ---------- | ---------- |
| GET     | /qa/:productId          | 16770.346 ms | 117.709 ms | 99.3       |
| GET     | /qa/:questionId/answers | 14710.889 ms | 69.198 ms  | 99.5       |

> Indexed tables from above with "WHERE reported = 0" added for questions

| Request | Endpoint                | Before     | After     | % Increase |
| ------- | ----------------------- | ---------- | --------- | ---------- |
| GET     | /qa/:productId          | 69.131 ms  | 87.677 ms | -26.8      |
| GET     | /qa/:questionId/answers | 130.562 ms | 68.126 ms | 47.8       |

> Indexed tables from above with "WHERE reported = 0" added for new_answers

| Request | Endpoint                | Before    | After     | % Increase |
| ------- | ----------------------- | --------- | --------- | ---------- |
| GET     | /qa/:productId          | 87.677 ms | 75.297 ms | 14.1       |
| GET     | /qa/:questionId/answers | 68.126 ms | 53.964 ms | 20.8       |

### From Initial

> From Initial
