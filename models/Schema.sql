-- STARTING POSTGRES SERVER AND LOG INTO POSTGRES AS "me"
-- brew services start postgresql
-- psql -d postgres -U me

-- Connect to our postgres database

-- Questions Schema
-- CREATE SCHEMA IF NOT EXISTS questions AUTHORIZATION me;
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
DROP DATABASE api;
CREATE DATABASE api;



-- 8 headers, 3521634 entries // 30s to seed
-- id, product_id, body, date_written, asker_name, asker_email, reported, helpful
CREATE TABLE questions
(
  question_id INT PRIMARY KEY,
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
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, photos []
-- TODO: reseed the database so it has this correct key, WAS question_helpfulness INT
CREATE TABLE answers

(
  id INT PRIMARY KEY,
  question_id INT REFERENCES questions(question_id),
  body TEXT,
  date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  reported INT,
  helpful INT
);

-- Altering answers to add a answer_photos coluumn
ALTER TABLE table_name answers;

ALTER TABLE answers ADD COLUMN photos TEXT [];



INSERT INTO answers

  (photos)
VALUES
  (
    ARRAY
[ 'test.rl', 'anothertest.jpg' ]
   )
   
   WHERE id = 1
   ;






insert into answers
  (photos)
select
  'John', 'Smith',
  '6 Brewery close, Buxton, Norfolk', 'cmp.testing@example.com'
where not exists (
    select *
from answers
where id = 1
);


-- COPY answers FROM '/Users/charmainetabilas/Desktop/apiCSVs/answers.csv' DELIMITERS ',' CSV header;
SELECT
  COUNT(*)
FROM
  answers

-- id, answer_id, url
CREATE TABLE answer_photos
(
  id INT PRIMARY KEY,
  answer_id INT REFERENCES answers(id),
  url TEXT
);

--  COPY answer_photos FROM '/Users/charmainetabilas/Desktop/apiCSVs/answers_photos.csv' DELIMITERS ',' CSV header;
SELECT
  COUNT(*)
FROM
  answer_photos

-- 3717892 photos
-- 3717892