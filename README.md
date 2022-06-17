# BadBank

## Description
This is a simulation banking app that includes the ability to create an account, log in, deposit funds, withdraw funds, and logout. I built this as an exercise in Javascript and React, but also to grow my ability to implement databases, authentication, and authorization.

## Installation Guidelines
- To get this project running locally start forking the Url, and then using the git clone command within a terminal to pull the files to your machine.
- Then install all the necessary dependencies by subsequently running the npm install command.
- Once that is finished running, get a Mongo database running by running the following command: docker run -p 27017:27017 --name badbank -d mongo.
- Then the last step is to run the project by entering the command node index.js within the root directory, and with the browser of you choice navigate to http://localhost:3000/.

## Screenshots
![home page](/img/home_badbank.png)
![create account page](/img/create_badbank.png)
![deposit page](/img/deposit_badbank.png)

## Technology Used
- Bootstrap for styles.
- React for a JS library and framework.
- Docker to run the database.
- Mongodb for a datase.
- CORS to indicate origins and add a level of security.
- Express.js to serve all of the static files of the application, to set up routes, and to communicate with the DAL.
- Node for a JavaScript runtime + Node package manager to install dependencies and other technologies.

## Features
This project in its current state can create and login users through a Mongo database. Near future implementations will include Firebase authentication and authorization, withdraw, deposit, view transactions, and logout functions.

## License
Default ISC license.
