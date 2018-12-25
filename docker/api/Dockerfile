FROM python:3.6
MAINTAINER Colin Cazabet <colin.cazabet@epitech.eu>

ENV PYTHONUNBUFFERED 1

COPY ./docker/api/django-entrypoint.sh /
COPY ./py-requirements /code/py-requirements

WORKDIR /code

RUN ["chmod", "+x", "/django-entrypoint.sh"]
RUN pip install pip==9.0.1
RUN pip install -r py-requirements/dev.txt