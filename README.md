# MWS Restaurants Review II

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

### Install Sails and Gulp globally

```
# npm i sails -g
# npm i gulp -g
```

_Location of server = /server_
Server depends on [node.js LTS Version: v6.11.2 ](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/get-npm), [sails.js](http://sailsjs.com/) and [gulp](https://gulpjs.com/)

Please make sure you have these installed before proceeding forward.

### Install dependancies and build the project

```
# npm i
```

## Usage

Start the server:

```
# npm start
```

Launch the client:

```
# gulp
```

The project will be reachable under:

```
# http://localhost:3000
```

### Usage Local Development API Server

debug: Environment : development
debug: Port : 1337

#### Get Restaurants

```
curl "http://localhost:1337/restaurants"
```

#### Get Restaurants by id

```
curl "http://localhost:1337/restaurants/{3}"
```

## Architecture

Local server

* Node.js
* Sails.js

Build

* Gulp.js

## Contributors

* [Brandy Lee Camacho - Technical Project Manager](mailto:brandy.camacho@udacity.com)
* [David Harris - Web Services Lead](mailto:david.harris@udacity.com)
* [Omar Albeik - Frontend engineer](mailto:omaralbeik@gmail.com)

## Issues

If you find a bug in the (server) source code or a mistake in the documentation, you can help us by
submitting an issue to our [Waffle Dashboard](https://waffle.io/udacity/mwnd-issues). Even better you can submit a Pull Request with a fix :)
