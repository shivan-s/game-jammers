FROM node:18-slim as builder

ENV CI=true
ENV NODE_ENV=production

WORKDIR /code

COPY frontend/package.json frontend/package-lock.json /code/

RUN npm install 


COPY ./frontend /code/

RUN npm run build


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
