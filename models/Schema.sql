-- Questions Schema
-- CREATE SCHEMA IF NOT EXISTS questions AUTHORIZATION me;
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
DROP DATABASE api;
CREATE DATABASE api;

-- 8 headers, 3521634 entries
-- id, product_id, body, date_written, asker_name, asker_email, reported, helpful
CREATE TABLE questions
(
  ID SERIAL PRIMARY KEY,
  product_id INT,
  question_id INT,
  question_body TEXT,
  question_date TEXT,
  asker_name TEXT,
  asker_email TEXT,
  question_helpfulness INT,
  reported INT,
  helpfulness INT
)

-- COPY questions FROM '/Users/charmainetabilas/Desktop/apiCSVs/questions.csv' DELIMITERS ',' CSV header;

-- HEADERS
-- id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
CREATE TABLE answers

(
  ID SERIAL PRIMARY KEY,
  question_id INT,
  body TEXT,
  date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  reported INT,
  question_helpfulness INT
);

-- COPY answers FROM '/Users/charmainetabilas/Desktop/apiCSVs/answers.csv' DELIMITERS ',' CSV header;