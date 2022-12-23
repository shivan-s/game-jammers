# FROM node:lts
#
# WORKDIR /app
#
# COPY frontend/package.json frontend/package-lock.json /app/
#
# RUN npm ci
#
# COPY frontend /app
#
# ENV CI=true

FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONNUNBUFFERED 1

WORKDIR /code

# install python dependences
# install pip-tools and pip
# hadolint ignore=DL3013
RUN pip install --no-cache-dir -U pip-tools pip

COPY backend/requirements/requirements.in /code/
# hadolint ignore=DL3042
RUN pip-compile -o requirements.txt requirements.in && \
  pip install --no-cache-dir --no-deps -r requirements.txt

# run entry scripts
COPY ./backend /code/
ENTRYPOINT ["sh", "-c", "/code/docker-entrypoint.sh"]
