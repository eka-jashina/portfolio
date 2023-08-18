const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const image = require('gulp-image');
const concat = require('gulp-concat');

const clean = () => {
	return del(['public/*'])
}

const svgSprites = () => {
  return src('./src/img/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('./public/img'));
}

function copyFonts() {
  return src('./src/fonts/**/*')
  .pipe(dest('./public/fonts/'))
}

const styles = () => {
  return src('./src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      cascade: false,
    }))
		.pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./public/css/'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(
    ['./src/js/**.js'])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./public/js'))
    .pipe(browserSync.stream());
}

const images = () => {
  return src([
		'./src/img/**.jpg',
		'./src/img/**.png',
		'./src/img/**.jpeg',
		'./src/img/**/*.jpg',
		'./src/img/**/*.png',
		'./src/img/**/*.jpeg'
		])
    .pipe(image())
    .pipe(dest('./public/img'))
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./public"
    },
  });

  watch('./src/css/**/*.css', styles);
  watch('./src/*.html', htmlMinify);
  watch('./src/img/*.{jpg,jpeg,png}', images);
  watch('./src/img/**/*.{jpg,jpeg,png,svg}', images);
  watch('./src/img/svg/**.svg', svgSprites);
}

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('public'))
		.pipe(browserSync.stream());
}

exports.styles = styles;

exports.htmlMinify = htmlMinify;


exports.default = series(clean, scripts, styles, images, svgSprites, copyFonts, htmlMinify, watchFiles);
