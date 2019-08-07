DROP DATABASE api;
CREATE DATABASE api;

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


COPY
questions FROM '/Users/charmainetabilas/Desktop/greenfieldApp-api-questions/apiCSVs/questions.csv' DELIMITER ',' CSV HEADER;


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

  