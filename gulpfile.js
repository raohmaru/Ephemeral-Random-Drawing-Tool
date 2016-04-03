'use strict';

var gulp       = require('gulp'),
	gutil      = require('gulp-util'),
	rename     = require('gulp-rename'),
	uglify     = require('gulp-uglify'),
	concat     = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	clean      = require('gulp-clean'),
	rev        = require('gulp-rev'),
	htmlrepl   = require('gulp-html-replace'),
	through    = require('through2'),
	path       = require('path');
	// jshint = require('gulp-jshint'),
	
var revHashes = {};

var SRC            = 'src/',
	DEST           = 'dist/',
	DIR_JS         = 'js/',
	DIR_CSS        = 'css/',
	DIR_SOURCEMAPS = '../maps',
	OUTPUT_JS      = 'app.js',
	OUTPUT_CSS     = 'styles.css',
	SCRIPTS_GLOB   = SRC + 'js/**/*.js',
	CSS_GLOB       = SRC + 'css/**/*.css';

// Delete the DEST directory
gulp.task('clean', function() {
	gutil.log('... cleaning DEST folder')
	// read:false prevents gulp from reading the contents of the file and makes clean a lot faster
	return gulp.src(DEST, {read: false})
		.pipe(clean());
});

gulp.task('scripts', ['clean'], function() {
	gutil.log('... linting, concatening and minifying scripts');
	return gulp.src(SCRIPTS_GLOB)
		// .pipe(jshint())
		// .pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat({path: OUTPUT_JS, cwd: ''}))  // Sourcemaps and concat needs cwd:''
		.pipe(sourcemaps.init())
		// .pipe(uglify())
		// Only minify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(rev())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(getRevHashes(DIR_JS))
		.pipe(sourcemaps.write(DIR_SOURCEMAPS))
		.pipe(gulp.dest(DEST + DIR_JS));
});

gulp.task('css', ['clean'], function() {
	gutil.log('... processing CSS');
	return gulp.src(CSS_GLOB)
		.pipe(concat({path: OUTPUT_CSS, cwd: ''}))  // Sourcemaps with rev needs cwd:''
		.pipe(rev())
		.pipe(getRevHashes(DIR_CSS))
		.pipe(gulp.dest(DEST + DIR_CSS));
});

gulp.task('html', ['scripts', 'css'], function() {
	gutil.log('... replacing static assets filenames with rev ones');	
	return gulp.src(SRC + 'index.html')
		.pipe(htmlrepl(revHashes))
		.pipe(gulp.dest(DEST));
});

function getRevHashes(dest) {
	var collect = function(file, enc, cb) {
		if (file.isNull()) {
			return cb(null, file);			
		}
		if(!file.isStream()) {
			if(file.revHash) {
				revHashes[file.extname.substr(1)] = dest + file.basename;
			}
		}
		this.push(file);
		cb();
	};
	return through.obj(collect);
}


gulp.task('default', ['clean', 'scripts', 'css', 'html']);