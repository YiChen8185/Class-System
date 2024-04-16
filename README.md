[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10677866&assignment_repo_type=AssignmentRepo)
# Milestone 2 - Class Questions

This workspace contains 2 projects that support the Class Questions web app
* frontend/
* backend/

`frontend/` contains the HTML/CSS/JS for the web application - this time, implemented in a framework called React with more pages and functionality.

All the style and layouts has been taken care of already. But some criticial functionality has not yet been implemented...

`backend/` contains a NodeJS web application server called Express. This server will send and receive the data to power the frontend. None of this is implemented yet.

## Getting Started

I'd suggest starting with the backend as the focus of this Milestone is implementing the data model that supports the web app.

### 1. Backend

```
cd backend
npm install
npm start
```

The backend needs to be running for the frontend to work. The frontend expects the backend to be running on Port `8080`.

Important files:
* `backend/src/app.js` contains the code for the Express web server. It has endpoints defined already, that all return a `501 Not implemented yet` status code.
* Within each endpoint is a description of what that endpoint is supposed to do, and how it should behave.
* `backend/spec/*.spec.js` contain integration tests that test the behavior of each endpoint to confirm it matches the description.
* `backend/spec/database.spec.js` contains unit tests for the `database` module which should store the provided data and then return it.

Functionality to implement. This is the recommended order since you can't create a class session without a class, for example:
* Implement the methods in `backend/src/database.js` You can run `npm run test-db` to run the unit tests for the functions in the `database` module
* Implement the `/api/login`, `/api/logout`, and `/api/user` endpoints in `backend/src/app.js`. You can run `npm run test-login` to run the unit tests for those endpoints until you get a :green_check:
* Implement the `/api/classes` endpoints in `backend/src/app.js`. You can run `npm run test-classes` to run the unit tests for those endpoints until you get a :green_check:
* Implement the `/api/class-session/:classId/session-code` endpoints in `backend/src/app.js`. You can run `npm run test-session-codes` to run the unit tests for those endpoints until you get a :green_check:
* Implement the `/api/class-session` endpoints in `backend/src/app.js`. You can run `npm run test-class-sessions` to run the unit tests for those endpoints unti you get a :green_check:

Once you've got all the tests passing with `npm run test`, you should move onto the frontend/ and finish connecting it to your new backend.


### 2. Frontend

```
cd frontend
npm install
npm start
```

Visit localhost:3000 to see the running application, remember - the backend for it is not implemented yet.

The frontend is built with a tool called "create-react-app" which creates a React application ready to start building on.

Important Files:
* `frontend/src/App.js` contains all the Routes for our application
* `frontend/src/pages/` contains all the various Pages used in the app
* `frontend/src/components/` contains smaller widgets that are included in Pages
* `frontend/public/index.html` contains the root HTML page where Bulma and other CSS can be installed
* Search for "CS 5356" to see all the comments on the pages which should provide more context for how to get the pages working correctly.

Use cases to focus on. This is the recommended order since you can't create a class session without a class, for example:
* the Home page is available on `/` and will allow you to either sign in, or join a class session
* Getting login to work will be your first hurdle.
* Then you can create a class on the Instructor Home page
* Then you can create a class session on the Instructor Home page
* Then you can ask questions in a class session on the Class Session page
* Then you can upvote a question for a class session on the Class Session page

If you worked on the `backend/` functionality first,

## Testing

### ESLint
This project also contains a linter, which you can use with your VSCode if you want by installing the ESLint plugin so you can get fast feedback about your code.

You can also manually run the linter using `npm run lint` from either the `frontend/` or `backend/` directories

### Jasmine Tests

All the tests should be passing for full credit. These will be run automatically for your Github Pull Requests. Run `npm test` to run the full suite.

## Deploying

This web app will run on Firebase Hosting & Firebase Cloud Functions. Follow the provided guides in Canvas to get your project ready to deploy.