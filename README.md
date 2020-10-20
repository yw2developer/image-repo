# firebase-react-app-boiler-plate
## Project setup
Install firebase CLI

`npm install -g firebase-tools`

Login to the firebase CLI

`firebase login`

In the base directory, install npm packages:

`npm install`

Then cd into the functions directory and install the npm packages for the backend:

```
cd functions
npm install
```

## Commands to Run the Frontend and Backend for Development

In the functions folder, transpile the backend with hot reloading

`npm run build-watch`

In a separate terminal the functions folder, run the backend

`npm run emulate`

In another separate terminal in the root directory, run the frontend with hot reloading

`npm run start`

## Deployment

In the functions folder, transpile the backend (don't need to do this if build-watch is already running)

`npm run build`

In the root directory, build the frontend

`npm run build`

In the root directory, test to make sure everything works

`npm run emulate`

When everything is good, deploy

`firebase deploy`

## Setting up Test and Development Environment Variables

In the base directory create a .env file containing your environment variables.<br />
These are the values found in the config or your firebase project.<br />
In the firebase console press the gear icon > Project Settings > General > Scroll down to Your Apps > Firebase SDK Snippet > Config<br />

In the functions directory create a .env file containing your environment variables that will be used for testing.<br />
In the funcions directory create a .runtimeconfig file containing your environment variables that will be used for development. These variables will be replaced by the production variables when you deploy.<br />
The .runtimeconfig file is structured as follows:

```
{
    "service": {
        "key1": "value1",
        "key2": "value2",
        ...
    },
    ...
}
```

## Setting up Production Environment Variables

In any directory run:

`firebase functions:config:set someservice.key="API KEY"`

This will set the value of `someservice.key` to `API KEY` in your production environment.

## Frontend Scripts

In the base directory you can run:

`npm run build`

Builds the react project. You need to build the project before running emulate.

`npm run emulate`

Emulates firebase hosting and firebase functions to test the frontend and backend together.

`npm run start`

Runs the frontend by itself. This has hot reloading and does not require to build first.<br />
Useful for testing quick front end changes.

`firebase deploy`

Deploys the application to production. You must build the frontend and backend before deploying.

## Backend Scripts
In the functions directory you can run:

`npm run build-watch`

Watches for server-side code changes and transpiles them from typescript to javascript.<br />
Has hot reloading so you don't need to restart when you make changes.<br />
When running emulate it is useful to have build-watch runnning in another terminal, as it allows you to make changes to the backend code without having to restart.

`npm run test`

Runs the tests on the backend code. The backend code does not need to be transpiled before running the test.



<!-- ## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
