# Pull base image
FROM python:3.6

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Copy project
COPY ./src /code/

# Install dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --deploy --system --skip-lock --dev