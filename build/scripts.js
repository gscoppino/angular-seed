/* Angular 1.x ES2015 Resource Definition Module
 * @depends: gulp, gulp-plumber, gulp-jspm, gulp-rename, gulp-sourcemaps, gulp-watch, gulp-batch
 *           JSPM must be set up for the project.
 * @input(s):  A single JS file that serves as the entry module to the application.
 * @output(s): A single minified JS file that contains all of the applications modules and the SystemJS bootstrap.
 *             A single sourcemap that allows the sources to be inspected in the debugger.
 */

// Node imports
import path from 'path';

// Gulp imports
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import jspm from 'gulp-jspm';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import batch from 'gulp-batch';

export default function (config) {

    // Scripts path
    const SCRIPTS_ENTRY = path.join(config.paths.src, 'main.js');
    const SCRIPTS_GLOB = path.join(config.paths.src, '**', '*.js');
    const OUTPUT_DIR = config.paths.dest;
    const OUTPUT_FILE = 'app.min.js';

    /* Plugin Configuration */

    const JSPM_CONFIG = {
        selfExecutingBundle: true
    };

    /* Gulp Configuration */

    gulp.task('build:scripts', function () {
      return gulp.src(SCRIPTS_ENTRY)
          .pipe(plumber())
          .pipe(sourcemaps.init())
              .pipe(jspm(JSPM_CONFIG))
              .pipe(rename(OUTPUT_FILE))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(OUTPUT_DIR));
    });

    gulp.task('watch:scripts', ['build:scripts'], function () {
        watch(SCRIPTS_GLOB, batch(function (events, done) {
            gulp.start('build:scripts', done);
        }));
    });

    return {
        build: 'build:scripts',
        watch: 'watch:scripts'
    };
}