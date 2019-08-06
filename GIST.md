## Overview

> The day was spent trying to maximize query results

## Log

## 10:00 am - New Joined Table

#### Challenge/Motivation

> In the current state, given that data was recieved via 3 different CSV's and data from the API I am creating includes information from all 3 tables, it has been difficult to seed and then querry on that information.

### Actions Taken

> As a solution, the data from the answers table in Postgres that was then altered to include data from the photos table were exported into a new joined CSV. This will allow for easier use in the future in case the table needed to be dropped for the schema to change. This process took quite some time.

> Initially, the new_answers schema was set up to take in a TEXT[] in Postgres. Because the table was given a photos array in JSON, the schema had to be modified to take in JSON otherwise the server responds with untransformed data. Initially, this was tried using ::jsonb on the query but adjusting the schema proved to be a similier solution.

## 3:00 pm - Indexing the different Tables

### Challenges/Motivation

> Run times to query the database and getting a reponse from the server were taking tens of thousands of milliseconds.

### Actions Taken

> Each table was indexed and then comparisons in query times, read/write/update responses, and table sizes were taken.

> The query times often improved by 2 orders of magnitude with the greatest increase in running a query 3 orders.

## 6:00 pm - Completeness

### Challenges/Motivation

> At this point, the most basic controllers were written out and they were being fine tuned in order to handle other parameters that could be passed into the endpoint (page, count)

### Actions Taken

> Data was extracted using req.params and querries in the models were adjusted to account for limits and offsetting that were grabbed from the req.params. 

> A problem that occured were with the GET request. The answers route had to be defined before the questions route. This was because the offset was calclulated based on the req.params and it was reading the "/answers" string in the endpoint as a value put in the offset calculation.

### Recorded Sizes of Tables

> Before/After Indexing

> Initial State: Non-Indexed Table

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | 534 MB  | 610 MB  | 14.2       |
| answers     | 1886 MB | 2151 MB | 14.1       |
| new_answers | 2120 MB | 2385 MB | 12.5       |

> Before/After Partial Indexing

> Initial State: Indexed Table

| Table Name  | Before  | After   | % Increase |
| ----------- | ------- | ------- | ---------- |
| questions   | 610 MB  | 757 MB  | 24.1       |
| new_answers | 2385 MB | 2637 MB | 10.5       |

### Recorded Times Queries on the Postgres Database

> Before/After Indexing

> Initial State: Non-Indexed Table

| Queries on the Postgres Database                   | Before      | After    | Efficiency |
| -------------------------------------------------- | ----------- | -------- | ---------- |
| `SELECT ... FROM questions WHERE product_id = ...` | 2144.990 ms | 0.736 ms | 2914x      |
| `SELECT ... FROM answers WHERE question_id = ...`  | 5967.155 ms | 2.460 ms | 2425x      |
| `SELECT ...` with new_answers table                | 1065.861 ms | 2.405 ms | 443x       |

> Partials on both

| Queries on the Postgres Database                | Before   | After    | Efficiency |
| ----------------------------------------------- | -------- | -------- | ---------- |
| `SELECT * FROM questions ... product_id ...`    | 0.736 ms | 0.097 ms | 7.6x       |
| `SELECT * FROM new_answers ... question_id ...` | 2.405 ms | 0.158 ms | 15.2x      |

### Recorded Times after queries on endpoints

> Indexed tables from above with "WHERE reported = 0" added for questions

| Request | Endpoint                | Indexed    | + Partial  | Efficiency |
| ------- | ----------------------- | ---------- | ---------- | ---------- |
| GET     | /qa/:productId          | 69.131 ms  | 64.397 ms  | 1.1x       |
| GET     | /qa/:questionId/answers | 130.562 ms | 120.413 ms | 1.1x       |

> Indexed tables from above with "WHERE reported = 0" added for new_answers

| Request | Endpoint                | Indexed    | + Partial | Efficiency |
| ------- | ----------------------- | ---------- | --------- | ---------- |
| GET     | /qa/:productId          | 64.397 ms  | 41.473 ms | 1.6        |
| GET     | /qa/:questionId/answers | 120.413 ms | 74.695 ms | 1.6x       |

- get questions before answers indexed: 6372.986ms
- get new_answers after indexed on questions and new_Answers 67.831ms


- Notes On Indexing: 
- Index is sorted list of values grouped by in our case proudct_id or question_id
  - This precalculates our data
  - Values indexed can be calculated and they are not just raw data from our fields
- Memory allocation is needed in order to implement a sort
- We are using a Hash Table to index because we are most interested in mathching (BTree)