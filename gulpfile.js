'use strict';

var gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	rename     = require('gulp-rename'),
	uglify     = require('gulp-uglify'),
	cssnano    = require('gulp-cssnano'),
	concat     = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	clean      = require('gulp-clean'),
	rev        = require('gulp-rev'),
	htmlrepl   = require('gulp-html-replace'),
	jshint     = require('gulp-jshint'),
	through    = require('through2'),
	fs         = require('fs'),
	runseq     = require('run-sequence');
	
var revHashes = {};

var SRC            = 'src/',
	DEST           = 'dist/',
	DIR_JS         = 'js/',
	DIR_CSS        = 'css/',
	DIR_IMG        = 'img/',
	DIR_SOURCEMAPS = '../maps',
	OUTPUT_JS      = 'app.js',
	OUTPUT_CSS     = 'styles.css',
	ENTRY_POINT    = SRC + 'index.html',
	CSS_GLOB       = SRC + DIR_CSS + '**/*.css',
	IMG_GLOB       = SRC + DIR_IMG + '**/*';

// Deletes the DEST directory
gulp.task('clean', function() {
	gutil.log('... cleaning DEST folder')
	// read:false prevents gulp from reading the contents of the file and makes clean a lot faster
	return gulp.src(DEST, {read: false})
		.pipe(clean());
});

gulp.task('scripts', function() {
	gutil.log('... linting, concatening and minifying scripts');
	return gulp.src(getJSSrcFromHTML(ENTRY_POINT))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat({path: OUTPUT_JS, cwd: ''}))  // Sourcemaps and concat needs cwd:''
		.pipe(sourcemaps.init())
		.pipe(uglify())
		// Only minify if gulp is ran with '--type production'
		// .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(rev())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(getRevHashes())
		.pipe(sourcemaps.write(DIR_SOURCEMAPS))
		.pipe(gulp.dest(DEST + DIR_JS));
});

gulp.task('css', function() {
	gutil.log('... processing CSS');
	return gulp.src(CSS_GLOB)
		.pipe(concat({path: OUTPUT_CSS, cwd: ''}))  // Sourcemaps with rev needs cwd:''
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(rev())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(getRevHashes())
		.pipe(sourcemaps.write(DIR_SOURCEMAPS))
		.pipe(gulp.dest(DEST + DIR_CSS));
});

gulp.task('html', ['scripts', 'css'], function() {
	gutil.log('... static JS/CSS revisioning');
	return gulp.src(ENTRY_POINT)
		.pipe(htmlrepl({
			'js':  DIR_JS  + revHashes[OUTPUT_JS],
			'css': DIR_CSS + revHashes[OUTPUT_CSS]
		}))
		.pipe(gulp.dest(DEST));
});


gulp.task('copy', function() {
	gutil.log('... copying assets to dist');
	return gulp.src(IMG_GLOB)
		.pipe(gulp.dest(DEST + DIR_IMG));
});

/**
 * Returns a ordered list of JS files from an HTML. The <script> tags must be after the opening comment
 * `<!-- build:js -->` and before the closing commment `<!-- endbuild -->`.
 * (or use gulp-useref)
 */
function getJSSrcFromHTML(file) {
	var src = [],
		content = fs.readFileSync(file, "utf8"),
		regexp = /<!--\s*build:js\s*-->\n?([\s\S]*?)\n?<!--\s*endbuild\s*-->/i,
		matches = content.match(regexp);
	if(matches) {
		matches[0].match(/src="([^"]+)/ig).forEach(function (match) {
			src.push(SRC + match.substr(5));
		});
	}
	return src;
}

/**
 * Fills the `revHashes` array with the filenames of the files processed by gulp-rev.
 * The array is used later to replace the static assets with the revisioned files.
 */
function getRevHashes() {
	var collect = function(file, enc, cb) {
		if(file.isNull()) {
			return cb(null, file);			
		}
		if(!file.isStream()) {
			if(file.revHash) {
				revHashes[file.revOrigPath] = file.basename;
			}
		}
		this.push(file);
		cb();
	};
	return through.obj(collect);
}


gulp.task('default', ['clean', 'scripts', 'css', 'html', 'copy']);

gulp.task('build', function(done) {
	runseq('clean', 'html', 'copy', done);
});