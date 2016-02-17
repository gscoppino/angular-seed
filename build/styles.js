/* Sass Resource Definition Module
 * @depends: gulp, gulp-plumber, gulp-sass, gulp-autoprefixer, gulp-rename,
 *           gulp-sourcemaps, gulp-watch, gulp-batch
 * @input(s): A single SCSS file that resolves any others needed via imports
 * @output(s): A single minified CSS file that has all properties autoprefixed for modern browsers.
 *             A single sourcemap that allows the sources to be properly inspected in the browser.
 */

// Node imports
import path from 'path';

// Gulp imports
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import batch from 'gulp-batch';

// JSPM path resolver for external SCSS
import sassJspmImporter from 'sass-jspm-importer';

export default function (config) {

	// Styles paths
	const SASS_ENTRY = path.join(config.paths.src, 'main.scss');
	const SASS_GLOB = path.join(config.paths.src, '**', '*.scss');
	const SASS_LIB_ROOT = path.join(config.paths.src, 'lib');
	const OUTPUT_DIR = config.paths.dest;
	const OUTPUT_FILE = 'app.min.css';

	/* Plugin Configuration */

	const SASS_CONFIG = {
		outputStyle: 'compressed',
		functions: sassJspmImporter.resolve_function(SASS_LIB_ROOT),
		importer: sassJspmImporter.importer
	};

	const AUTOPREFIXER_CONFIG = {
		browsers: [
			'IE 11',
			'last 2 Chrome versions',
			'last 2 Firefox versions',
			'last 2 Edge versions',
			'last 2 Safari versions',
			'last 2 Android versions',
			'last 2 ChromeAndroid versions',
			'last 2 iOS versions',
			'last 2 ExplorerMobile versions'
		]
	};

	/* Gulp Configuration */

	gulp.task('build:styles', function () {
		return gulp.src(SASS_ENTRY)
			// Prevent pipeline breaking on errors
			.pipe(plumber())
			// Begin tracking transformations for sourcemap creation
			.pipe(sourcemaps.init())
				// Compile SCSS->CSS + minify output
				.pipe(sass(SASS_CONFIG).on('error', sass.logError))
				// Apply prefixes to CSS properties for modern web browsers
				.pipe(autoprefixer(AUTOPREFIXER_CONFIG))
				// Rename file stream
				.pipe(rename(OUTPUT_FILE))
			// Write output files
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(OUTPUT_DIR));
	});

	gulp.task('watch:styles', ['build:styles'], function () {
		watch(SASS_GLOB, batch(function (events, done) {
			gulp.start('build:styles', done);
		}));
	});

	// Exports
	return  {
		build: 'build:styles',
		watch: 'watch:styles'
	};

}