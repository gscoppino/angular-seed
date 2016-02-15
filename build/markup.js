/* Markup Resource Definition Module
 * @depends: gulp, gulp-watch, gulp-batch, gulp-preprocess
 * @input(s): The index.html of the app.
 * @output(s): The index.html of the app, with references
 *             to distributables injected, and development
 *             cruft removed.
 */

 // Node imports
 import path from 'path';

 // Gulp imports
 import gulp from 'gulp';
 import watch from 'gulp-watch';
 import batch from 'gulp-batch';
 import preprocess from 'gulp-preprocess';

 export default function (config) {

    // Templates paths
    const INPUT = path.join(config.paths.src, 'index.html');
    const OUTPUT_DIR = config.paths.dest;

    /* Gulp Configuration */
    const PREPROCESS_CONFIG = {
        css: '<link rel="stylesheet" href="app.min.css">',
        js: '<script src="app.min.js"></script>'
    };

    gulp.task('build:markup', function () {
        return gulp.src(INPUT)
            .pipe(preprocess({ context: PREPROCESS_CONFIG }))
            .pipe(gulp.dest(OUTPUT_DIR));
    });

    gulp.task('watch:markup', function () {
        watch(INPUT, batch(function (events, done) {
            gulp.start('build:markup', done);
        }));
    });

    return {
        build: 'build:markup',
        watch: 'watch:markup'
    };
 }