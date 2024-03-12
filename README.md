# My portfolio

### The application does not collect any sensitive data

## Description

The application presents my CV in a more interesting way than PDF. The main goal of this project was to present some of my skills - building a web application, creating a server connected to a database and preparing development and production versions with deploy.

## Table of Contents

- [Installation](#installation)
- [Deployment](#deployment)
- [Related links](#related-links)

## Installation

If you want to run this project yourself, you can do it in two ways:

#### 1. Production version

- To run this version you need the docker-compose.yml file from root directory

  The application uses images that I prepared and uploaded on DockerHub: https://hub.docker.com/r/kasiawinkler/portfolio/tags

- Execute the following command

  ```
  docker compose up -d
  ```

#### 2. Development version

- To run this version you need the following files and directories:

  - backend/
  - frontend/
  - development.yml

- Execute the following command

  ```
  docker compose -f development.yml up -d
  ```

## Deployment

The application is deployed on the Netlify platform: https://www.netlify.com. For this purpose, I created a new branch (netlify-app) and used the method provided by this platform - functions. It replaces the server that handles requests from a web application. To store data I used a database - FaunaDB.

Go to https://kwinkler.netlify.app and have fun :)

## Related links

- Netlify - https://kwinkler.netlify.app/
- App design - [https://www.figma.com/portfolio](https://www.figma.com/file/svGxBneV4qgk7yZPMT0P3x/Portfolio?type=design&node-id=0%3A1&mode=design&t=dXwYSUMjkJ9bZ65t-1)
- DockerHub - https://hub.docker.com/r/kasiawinkler/portfolio/tags
