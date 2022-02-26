/*
	Tasks:

	$ gulp 					: Runs all tasks.
	$ gulp watch			: Starts a watch on all tasks.
	$ gulp css				: Runs "css" task.
	$ gulp webcomponent		: Runs "webcomponent" tasks.
*/

const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const typescript = require('gulp-typescript');
const replace = require('gulp-replace');
const fs = require('fs');

const inputDir = 'src';
const outputDir = 'dist';
const binDir = 'bin';

const css = cb => {
    return src(inputDir + '/scss/mburger.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss())
        .pipe(dest(outputDir));
};

const webcomponentJs = cb => {
    return src([
        inputDir + '/ts/*.d.ts', //	Include all typings.
        inputDir + '/ts/*.ts' // Include the needed ts files.
    ])
        .pipe(
            typescript({
                target: 'es6',
                module: 'es6'
            })
        )
        .pipe(dest(binDir));
};

const webcomponentCss = cb => {
    return src(inputDir + '/scss/webcomponent.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss())
        .pipe(dest(binDir));
};

const webcomponentConcat = cb => {
    var styles = fs.readFileSync(binDir + '/webcomponent.css');
    return src(binDir + '/mburger.js')
        .pipe(replace('[__STYLES__]', styles))
        .pipe(dest(outputDir));
};

const webcomponent = series(
    parallel(webcomponentCss, webcomponentJs),
    webcomponentConcat
);

const watchTask = cb => {
    watch(inputDir + '/scss/*.scss', parallel(css, webcomponent));
    watch(inputDir + '/ts/*.ts', webcomponent);
    cb();
};

exports.default = parallel(css, webcomponent);
exports.watch = watchTask;
exports.css = css;
exports.webcomponent = webcomponent;
