# Pomodoro Web-app
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![Build Status](https://travis-ci.org/mgiridhar/pomodoro_web.svg?branch=master)](https://travis-ci.org/mgiridhar/pomodoro_web)

[Pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) time management web-app => [Live Demo](https://giridhar-pomodoro.herokuapp.com)

This is a simple front end web application build using [ReactJS](https://reactjs.org/) that helps users manage their time using the famous [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).

This project uses [Travis CI](https://travis-ci.org) for testing and deployment. The live demo of the app is hosted on [Heroku](http://heroku.com/) platform.

## Getting Started

### Prerequisites

#### Install Node and NPM
[Node](https://nodejs.org/) is easy to install and comes with [npm](https://www.npmjs.com/) (node package manager).

##### OS X
```
brew install node
```
##### Linux
For Debian, Ubuntu distros,
```
sudo apt-get install nodejs npm
```
For RHEL, CentOS distros,
```
yum install nodejs npm
``` 

##### Windows
Go to official [Node.js](https://nodejs.org/) website and grab the installer. Also, be sure to have git available in your PATH, npm might need it.

#### Check Node and NPM versions
After installation, the node and npm versions can be checked using the below commands.
```
node --version
npm --version
```

### Installing the App
Clone the repository and go to the project directory. Then install the required packages using npm.
```
git clone https://github.com/mgiridhar/pomodoro_web.git
cd pomodoro_web
npm install
```

### Running the Tests
[Unit tests](https://en.wikipedia.org/wiki/Unit_testing) and [Integration tests](https://en.wikipedia.org/wiki/Integration_testing) for this ReactJS app are written using Jest, Enzyme, and Sinon. Run the following command to check if the current tests are passing for the app.
```
npm test
```

### Running the App
To run the app locally, use the following command. This starts the app and can be viewed at http://localhost:3000/
```
npm start
```

### Simple build for Production
To create a production build for the app run the below command.
```
npm run build
```

## Tools Used
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Enzyme](http://airbnb.io/enzyme/) - JavaScript Testing utility for React.
- [Sinon](http://sinonjs.org/) - Standalone test spies, stubs and mocks for JavaScript.
- [Jest](https://facebook.github.io/jest/en/) - JavaScript Testing.
- [Node](https://nodejs.org/) - JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/).
- [Travis CI](https://travis-ci.org) - For Testing and Deployment.
- [Heroku](http://heroku.com/) - Cloud platform to build, deliver, monitor and scale apps.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.