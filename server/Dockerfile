FROM python:3.11-alpine

WORKDIR /usr/src/app
ENV PYTHONUNBUFFERED=1

COPY requirements.txt ./

RUN apk update && \
    apk add --no-cache mariadb-connector-c-dev build-base

RUN pip install --no-cache-dir --user -r requirements.txt

COPY . .
