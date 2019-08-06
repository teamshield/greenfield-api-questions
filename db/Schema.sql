-- STARTING POSTGRES SERVER AND LOG INTO POSTGRES AS "me"
-- brew services start postgresql
-- psql -d api -U me

-- Connect to our postgres database

-- Questions Schema
-- CREATE SCHEMA IF NOT EXISTS questions AUTHORIZATION me;
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
DROP DATABASE api;
CREATE DATABASE api;



-- 8 headers, 3521634 entries // 30s to seed
-- id, product_id, body, date_written, asker_name, asker_email, reported, helpful
DROP TABLE IF EXISTS questions;
CREATE TABLE questions
(
  question_id INT NOT NULL,
  product_id INT NOT NULL,
  question_body TEXT NOT NULL,
  question_date date,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported INT,
  question_helpfulness INT NOT NULL,
  CONSTRAINT "Questions_pkey" PRIMARY KEY
(question_id)
)
WITH
(
    OIDS = FALSE
);


-- Count the number of rows
SELECT
  COUNT(*)
FROM
  questions

COPY
questions FROM '/Users/charmainetabilas/Desktop/greenfieldApp-api-questions/apiCSVs/questions.csv' DELIMITER ',' CSV HEADER;

-- HEADERS, 12392946 rows
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful, photos []
-- TODO: reseed the database so it has this correct key, WAS question_helpfulness INT
DROP TABLE IF EXISTS answers;
CREATE TABLE answers
(
  answer_id INT NOT NULL,
  question_id INT,
  body TEXT,
  date date,
  answerer_name TEXT,
  answerer_email TEXT,
  report INT,
  helpfulness INT,
  CONSTRAINT "Answers_pkey" PRIMARY KEY
  (answer_id)
)
WITH
  (
  OIDS = FALSE
);

-- COPY answers FROM '/Users/charmainetabilas/Desktop/greenfieldApp-api-questions/apiCSVs/answers.csv' DELIMITERS ',' CSV header;

-- Altering answers to add a answer_photos coluumn
ALTER TABLE answers
ADD COLUMN photos jsonb[] DEFAULT '{}'::jsonb[];


SELECT
  COUNT(*)
FROM
  answers

-- id, answer_id, url


DROP TABLE IF EXISTS new_answers;
CREATE TABLE new_answers
(
  answer_id INT NOT NULL,
  question_id INT,
  body TEXT,
  date date,
  answerer_name TEXT,
  answerer_email TEXT,
  report INT,
  helpfulness INT,
  photos JSON
  [],
  CONSTRAINT "New_Answers_pkey" PRIMARY KEY
  (answer_id)
)
  WITH
  (
  OIDS = FALSE
);

  -- COPY new_answers FROM '/Users/charmainetabilas/Desktop/apiCSVs/new_answers.csv' DELIMITERS ',' CSV header;


  -- 3717892 photos
  -- 3717892

  -- id, answer_id, url
  DROP TABLE IF EXISTS photos;
  CREATE TABLE photos
  (
    id INT NOT NULL,
    answer_id INT NOT NULL,
    url TEXT,
    CONSTRAINT "Photos_pkey" PRIMARY KEY(id)
  )
  WITH
(
   OIDS = FALSE
);

-- EXPLAIN analyze SELECT * FROM questions where product_id = 1;

-- SIZING TABLES 
-- SELECT pg_size_pretty( pg_total_relation_size('tablename'));
-- SELECT pg_size_pretty( pg_total_relation_size('new_answers'));

-- INDEXING
--  CREATE INDEX ON questions (product_id) ;
-- CREATE INDEX ON answers (question_id);
-- CREATE INDEX ON new_answers (question_id);
--  CREATE INDEX ON questions (product_id) WHERE reported = 0;

-- EXPAIN
--  EXPLAIN analyze SELECT * FROM new_answers where question_id = 1;

