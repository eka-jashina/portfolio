const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const image = require('gulp-image');
const concat = require('gulp-concat');
const webp = require('gulp-webp');

const clean = () => {
	return del(['public/*'])
}

const webpImg = () => {
  return src('src/img/**/*.jpg')
    .pipe(webp())
    .pipe(dest('public/img'))
}

const svgSprites = () => {
  return src('./src/img/svg/**.svg')
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
    .pipe(cleanCSS({ level: 2 }))
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
    .pipe(concat('script.js'))
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
		'./src/img/*.svg',
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
  watch('./src/js/**/*.js', scripts);
  watch('./src/img/*.{jpg,jpeg,png,svg}', images);
  watch('./src/img/**/*.{jpg,jpeg,png}', images);
  watch('./src/img/svg/**.svg)', svgSprites);
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


exports.default = series(clean, scripts, styles, images, webpImg, svgSprites, copyFonts, htmlMinify, watchFiles);
