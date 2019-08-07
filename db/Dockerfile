# Dockerfile
FROM postgres:9.4

RUN mkdir -p /tmp/psql_data/

COPY ./structure.sql /tmp/psql_data/
COPY ./new_answers.csv /tmp/psql_data/
COPY ./questions.csv /tmp/psql_data/