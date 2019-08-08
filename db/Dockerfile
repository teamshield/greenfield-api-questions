# Dockerfile
FROM postgres:9.4

COPY *.sql /docker-entrypoint-initdb.d/
ADD setup.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*


