FROM python:3 as django
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

FROM node:16 as websocker
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY index.js package.json package-lock.json ./
EXPOSE 3000
CMD [ "node", "server.js" ]