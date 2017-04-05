// ___________________________________________________
//
//  Project Information
//
// ___________________________________________________

const sources = {
  src: './src',
  sass: './src/scss/**/*.scss',
  js: './src/js/**/*.js',
  template: './src/js/**/*.ejs',
};

const dist = './dist/';

// ___________________________________________________
//
//  Module
//
// ___________________________________________________

import gulp from 'gulp';
import sass from 'gulp-sass';
import moduleImporter from 'sass-module-importer';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import runSequence from 'run-sequence';
import uglify from 'gulp-uglify';
import copy from 'gulp-copy';
import ignore from 'gulp-ignore';
import del from 'del';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import webpackconfig from "./webpack.config.babel.js";
import changed  from 'gulp-changed';
import watch  from 'gulp-watch';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';

// ___________________________________________________
//
//  Task
//
// ___________________________________________________

gulp.task('default', [
  'browser-sync',
  'watch'
]);


// ___________________________________________________
//
//  CSS Compile
//
// ___________________________________________________

gulp.task('sass', () => {
  console.log("--------- Sass & Scss Compile ----------");
  return gulp.src( sources.sass )
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sass({
      importer: moduleImporter()
  }))
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({
    browsers: [
      "last 2 versions",
      "ie >= 10",
      "Android >= 4",
      "ios_saf >= 9"
    ]
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dist))
  .pipe(notify("COMPILE <%= file.relative %>"))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// ___________________________________________________
//
//  Javascript
//
// ___________________________________________________

gulp.task('webpack', () => {
  console.log("--------- COMPILE Javascript ----------");
  return gulp.src(sources.js)
  .pipe(plumber())
  .pipe(webpack(webpackconfig)).pipe(notify("COMPILE <%= file.relative %>"))
  .pipe(gulp.dest(dist + "/js/"))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// ___________________________________________________
//
//  Copy
//
// ___________________________________________________


gulp.task('copy', () => {
  console.log("--------- Reload ----------");
  return gulp.src([sources.src + "/**/*", "!/**/*.scss", "!/**/*.js", "!/**/*.ejs"])
  .pipe(plumber())
  .pipe(ignore.include({
    isFile: true
  }))
  .pipe(gulp.dest(dist))
  .pipe(browserSync.reload({
    stream: true
  }));
});

// ___________________________________________________
//
//  template
//
// ___________________________________________________

gulp.task('ejs', () => {
  gulp.src([sources.src + '/**/*.ejs', '!' + sources.src + '/**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({extname: ".html"}))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// ___________________________________________________
//
//  Build
//
// ___________________________________________________

gulp.task('build:css', () => {
  return gulp.src(sources.sass)
  .pipe(plumber())
  .pipe(autoprefixer({
    browsers: [
      "last 2 versions",
      "ie >= 10",
      "Android >= 4",
      "ios_saf >= 9"
    ]
  }))
  .pipe(gulp.dest(dist));
});

gulp.task('build:webpack', () => {
  return gulp.src(sources.js)
  .pipe(plumber())
  .pipe(webpack(webpackconfig))
  .pipe(gulp.dest(dist + "/js"));
});

gulp.task('build:copy', () => {
  return gulp.src([sources.src + "/**/*", "!/**/*.scss", "!/**/*.js", "!/**/*.ejs"])
  .pipe(ignore.include({
    isFile: true
  }))
  .pipe(gulp.dest(dist));
});

gulp.task('build', (callback) => {
  return runSequence(
    'clean',
    ['build:css', 'build:webpack', 'build:copy', 'ejs'],
    callback
  );
});

// ___________________________________________________
//
//  Clean
//
// ___________________________________________________

gulp.task('clean', () => {
  del( dist + '/**/*' )
});

// ___________________________________________________
//
//  Watch
//
// ___________________________________________________

gulp.task('watch', () => {
  watch([sources.sass], () => {
    return gulp.start(['sass']);
  });
  watch([sources.js], () => {
    return gulp.start(['webpack']);
  });
  watch([sources.src + "/**/*.ejs"], () => {
    return gulp.start(['ejs']);
  });
  watch([sources.src + "/**/*", "!/**/*.scss", "!/**/*.js", "!/**/*.ejs", '!/dist/**/*'], () => {
    return gulp.start(['copy']);
  });
});


// ___________________________________________________
//
//  Live Reload
//
// ___________________________________________________

gulp.task( 'browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3040,
    open: "external"
  });
});
