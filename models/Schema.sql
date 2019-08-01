-- STARTING POSTGRES SERVER AND LOG INTO POSTGRES AS "me"
-- brew services start postgresql
-- psql -d postgres -U me

-- Connect to our postgres database

-- Questions Schema
-- CREATE SCHEMA IF NOT EXISTS questions AUTHORIZATION me;
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
DROP DATABASE api;
CREATE DATABASE api;



-- 8 headers, 3521634 entries
-- id, product_id, body, date_written, asker_name, asker_email, reported, helpful
CREATE TABLE questions
(
  question_id INT,
  product_id INT,
  question_body TEXT,
  question_date TEXT,
  asker_name TEXT,
  asker_email TEXT,
  reported INT,
  helpful INT
);

-- Count the number of rows
SELECT
  COUNT(*)
FROM
  questions

-- COPY questions FROM '/Users/charmainetabilas/Desktop/apiCSVs/questions.csv' DELIMITERS ',' CSV header;

-- HEADERS, 12392946 rows
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
CREATE TABLE answers

(

  question_id INT,
  body TEXT,
  date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  reported INT,
  question_helpfulness INT
);


-- COPY answers FROM '/Users/charmainetabilas/Desktop/apiCSVs/answers.csv' DELIMITERS ',' CSV header;
SELECT
  COUNT(*)
FROM
  answers

-- id, answer_id, url
CREATE TABLE answer_photos
(
  id INT,
  answer_id INT,
  url TEXT
);

--  COPY answers FROM '/Users/charmainetabilas/Desktop/apiCSVs/answers_photos.csv' DELIMITERS ',' CSV header;
SELECT
  COUNT(*)
FROM
  answer_photos