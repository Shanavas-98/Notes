
# Notes : CRUD Application using Vite, React and Yarn

A simple CRUD (Create, Read, Update, Delete) application built using Vite and React, managed by Yarn.
User authentication and authorization using JWT.
Email verification link send using Nodemailer.
## Table of contents

- [Installation]()
- [Environment Variables]()
- [Run Locally]()
- [Features]()
- [Author]()

## Installation

Make sure you have Node.js, MongoDB Compass and Yarn installed on your machine.

1.Clone the repository:

```bash
git clone https://github.com/Shanavas-98/Notes.git
```
2.Navigate to the Notes directory:

```bash
cd Notes
```
3.Navigate to the CLIENT directory:

```bash
cd CLIENT
```
4.Install dependencies:

```bash
yarn install
```
5.Open another terminal and navigate to the SERVER directory:

```bash
cd SERVER
```
6.Install dependencies:

```bash
yarn install
```
    
## Environment Variables
 - [Client Side]()

To run this project, you will need to add the following environment variables to your Client side .env file

`VITE_REACT_APP_SERVER_URL`

 - [Server Side]()

To run this project, you will need to add the following environment variables to your Server side .env file

`PORT`

`MONGO_URI`

`CLIENT_URL`

`JWT_SECRET`

Add node mailer environment variables

`SMTP_HOST`

`SMTP_SERVICE`

`SMTP_PORT`

`SMTP_USER`

`SMTP_PASS`

## Run Locally

1.Open new terminal and go to the CLIENT directory

```bash
  cd CLIENT
```

2.Run client side

```bash
  yarn dev
```

3.Open new terminal and go to the SERVER directory

```bash
  cd SERVER
```
4.Run server side

```bash
  npm start
```
5.Now open any browser and enter url

```bash
  http://localhost:5173
```


## Features

- Login/Register
- JWT Authentication
- CRUD operations
- Email verification


## Author

- [Shanavas](https://github.com/Shanavas-98)

