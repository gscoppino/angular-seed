import gulp from 'gulp';
import path from 'path';
import minimist from 'minimist';
import browser_sync from 'browser-sync';
import karma from 'karma';


// Input and Output folders
const SRC_PATH  = path.join(process.cwd(), 'src');
const DEST_PATH = path.join(process.cwd(), 'dist');


// Parse Command Line Arguments
const argv = minimist(process.argv.slice(2)); // First two args are the paths
                                              // to node and gulp, don't
                                              // include these.


// Define configuration for build modules.
// Pass the input and output folders,
// along with command line arguments to gulp.
let config = {
    argv:  argv,
    paths: {
        src: SRC_PATH,
        dest: DEST_PATH
    }
};


// Instantiate build modules.

import MarkupFactory from './build/markup';
import StylesFactory from './build/styles';
import ScriptsFactory from './build/scripts';

let markup = MarkupFactory(config);
let styles = StylesFactory(config);
let scripts = ScriptsFactory(config);

// Instantiate browser sync.
let server = browser_sync.create();

/** Compose Gulp Tasks **/

gulp.task('build', [markup.build, styles.build, scripts.build]);
gulp.task('watch:build', [markup.watch, styles.watch, scripts.watch]);

/** Other Gulp Tasks **/

gulp.task('test', ['build'], function (done) {
    let server = new karma.Server({
        configFile: path.join(config.paths.src, '_karma.conf.js'),
        singleRun: true
    }, function () {
        done();
    });

    server.start();
});

gulp.task('serve', function () {
    server.init({
        server: {
            baseDir: config.paths.src
        }
    });

    const SRC_LIB = path.join(config.paths.src, 'lib');
    const SRC_TESTS = path.join(config.paths.src, '**', '*.spec.js');
    gulp.watch([
        path.join(config.paths.src, '**', '*'),
        '!' + path.join(SRC_LIB, '**', '*'),
        '!' + SRC_TESTS
    ])
        .on('change', server.reload);
});

gulp.task('serve:production', ['watch:build'], function () {
    server.init({
        server: {
            baseDir: config.paths.dest
        }
    });

    gulp.watch(path.join(config.paths.dest, '**', '*'))
        .on('change', server.reload);
});

gulp.task('default', ['build']);