An Angular 1.x ES2015 + SASS development environment + production build,
using gscoppino/gulp-seed.

What you get:
* Write Angular 1.x in ES2015 using ES2015 modules.
* Frontend JS dependency management via JSPM, which supports loading dependencies
  using ES2015 module loading syntax.
* Unit testing via Karma/Jasmine (also supporting ES2015 and ES2015 modules)
* Frontend code coverage reports for ES2015.
* Write stylesheets in SASS.
*  Frontend SASS dependency management via JSPM.
* Serve development and production builds with BrowserSync (with support for LiveReload).

# Using The Boilerplate

## In a new project

1. Clone this repository.
2. Run `npm install`
3. Run `jspm install`.

## Running the gulpfile

**(Recommended)**

Install Gulp globally in order to run the project gulpfile:
`npm install -g gulp`

**(Not Recommended)**

Open `package.json` and create an npm script to run the project gulpfile
using the local installation of gulp.
```
"scripts": {
    "gulp": "gulp"
}
```
Though this method works, it is not offically supported and may break
in Gulp 4.x.

## Running JSPM

**(Recommended)**

Install JSPM globally in order to use JSPM commands from the CLI.
`npm install -g jspm`

**(Not Recommended)**

Open `package.json` and create an npm script to run the local project
jspm installation.
```
"scripts": {
    "jspm": "jspm"
}
```

Though this method works, it is not officially supported by JSPM.