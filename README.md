[![Build Status](https://travis-ci.org/chkakaja/sentimize.svg?branch=master)](https://travis-ci.org/chkakaja/sentimize)
[![Stories in Ready](https://badge.waffle.io/chkakaja/sentimize.png?label=ready&title=Ready)](https://waffle.io/chkakaja/sentimize)
# Sentimize

  Sentiment analysis during video recording for interviews and training.

  TODO: add Screenshot

## Table of Contents
1. [Usage](#Usage)
2. [Getting started](#Getting-Started)
  1. [Clone the latest version](#Installing-Dependencies)
  2. [Install Dependencies](#Installing-Dependencies)
  3. [Setup Environment Variables](#Environment-Variables)
  4. [Start the application](#Start-application)
3. [Technologies](#Technologies)
4. [Architecture](#Architecture)
5. [Team](#Team)
6. [Contributing](#Contributing)

## Usage
> Some usage instructions

## Getting started

#### 1. Clone the latest version

  Start by cloning the latest version of Sentimize on your local machine by running:

  ```sh
  $ git clone https://github.com/chkakaja/sentimize
  $ cd sentimize
  ```

#### 2. Install Dependencies
  From within the root directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Setup Environment Variables

#### 4. Run the application

## Technologies

##### Front end:
- React
- Face Analysis Cloud Engine API by Sightcorp
- Browserify
- Chartjs
- Babel

##### Back end:
- Node
- Express
- Jade
- Bookshelf/Knex
- MySQL

##### Testing:
- Mocha
- Chai
- jsdom

## Architecture
![sentimize](https://cloud.githubusercontent.com/assets/10008938/15795587/c0bfd19a-29a7-11e6-9402-de7dabdf1526.png)

## Directory Layout
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /client/                    # Client source code
│   ├── /build/                 # Build file produced with Browserify
│   ├── /components/            # React components
│     ├── /home-view/           # Home view components
│     ├── /main-layout/         # Main Layout components
│     ├── /record-view/         # Record view components
│     ├── /report-view/         # Reporting view components
│     ├── /App.jsx/             # Main React App
│   ├── /lib/                   # Static pages like About Us, Privacy Policy etc.
│   ├── /style/                 # GraphQL server schema and data models
│   ├── /index.js               # GraphQL server schema and data models
├── /server/                    # Server source code
│   ├── /config/                # Initial server config files
│   ├── /controllers/           # Controllers for database interaction
│   ├── /lib/                   # Lib for util functions
│   ├── /models/                # Data models
│   ├── /routes/                # Routes for incoming GET and POST requests
│   ├── /views/                 # Jade templating views
│   └── /server.js              # Server-side startup script
├── /test/                      # Server and client side tests
│   ├── /client/                # Client side tests
│   ├── /server/                # Server side tests
└── package.json                # List of 3rd party libraries and utilities to be installed
└── package.json                # The list of 3rd party libraries and utilities
└── package.json                # The list of 3rd party libraries and utilities
└── package.json                # The list of 3rd party libraries and utilities
```

## Team
  - Product Owner:            Christian Haug
  - Scrum Master:             Jack Zhang
  - Development Team Members: Christian Haug, Jack Zhang, Kani Munidasa, Katherine Hao

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

[Stories in Ready](#https://badge.waffle.io/chkakaja/sentimize.png?label=ready&title=Ready)
