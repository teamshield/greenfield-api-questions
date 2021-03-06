DROP TABLE IF EXISTS questions;
CREATE TABLE questions
(
  question_id SERIAL,
  product_id INT NOT NULL,
  question_body TEXT NOT NULL,
  question_date date not null default CURRENT_DATE,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported INT DEFAULT 0,
  question_helpfulness INT DEFAULT 0,
  CONSTRAINT "Questions_pkey" PRIMARY KEY
(question_id)
)
WITH
(
    OIDS = FALSE
);



DROP TABLE IF EXISTS new_answers;
CREATE TABLE new_answers
(
  answer_id SERIAL,
  question_id INT,
  body TEXT,
  date date not null default CURRENT_DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  report INT DEFAULT 0,
  helpfulness INT DEFAULT 0,
  photos JSON
  [],
  CONSTRAINT "New_Answers_pkey" PRIMARY KEY
  (answer_id)
)
  WITH
  (
  OIDS = FALSE
);

-- SEED FUNCTIONS
\COPY questions FROM '/docker-entrypoint-initdb.d/csv/questions.csv' DELIMITERS ',' CSV header;

\COPY new_answers FROM '/docker-entrypoint-initdb.d/csv/new_answers.csv' DELIMITERS ',' CSV header;

  -- SETTING INTERVAL
  SELECT setval('questions_question_id_seq', (SELECT COUNT(*)
    FROM questions), true);
  SELECT setval('new_answers_answer_id_seq', (SELECT COUNT(*)
    FROM new_answers), true);

  -- INDEXING

  CREATE INDEX ON questions
  (product_id);
  CREATE INDEX ON questions
  (product_id) WHERE reported = 0;
  CREATE INDEX ON new_answers
  (question_id);
  CREATE INDEX ON new_answers
  (question_id) WHERE report = 0
