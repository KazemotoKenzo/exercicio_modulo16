const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

async function compIMG(){
    const imagemin = (await import('gulp-imagemin')).default;

    return gulp.src('./src/images/*', {encoding: false})
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function compJS(){
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compSass(){
    return gulp.src('./src/styles/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./build/styles'));
}

function watchGulp(){
    gulp.watch('./src/styles/*.scss', {ignoreInitial: false}, gulp.series(compSass));
    gulp.watch('./src/scripts/*.js', {ignoreInitial: false}, gulp.series(compJS));
    gulp.watch('./src/images/*', {ignoreInitial: false}, gulp.series(compIMG));
}


exports.default = watchGulp;