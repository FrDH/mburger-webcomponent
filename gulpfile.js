/*
	Tasks:

	$ gulp 					: Runs all tasks.
	$ gulp watch			: Starts a watch on all tasks.
	$ gulp css				: Runs "css" task.
	$ gulp webcomponent		: Runs "webcomponent" tasks.
*/


const { src, dest, watch, parallel, series } = require( 'gulp' );

const sass 		= require( 'gulp-sass' );
const cleancss	= require( 'gulp-clean-css' );
const concat	= require( 'gulp-concat' );


const inputDir 	= 'src';
const outputDir = 'dist';
const binDir 	= 'bin';


const css = ( cb ) => {
	return src( inputDir + '/mburger.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( cleancss() )
		.pipe( dest( outputDir ) );
};

const webcomponentCss = ( cb ) => {
	return src( inputDir + '/webcomponent.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( cleancss() )
		.pipe( dest( binDir ) );
};

const webcomponentConcat = ( cb ) => {
	return src([
		binDir + '/webcomponent-prefix.txt',
		binDir + '/webcomponent.css',
		binDir + '/webcomponent-affix.txt'
	])
	.pipe( concat( 'mburger.js' ) )
	.pipe( dest( outputDir ) );
};

const webcomponent = series( webcomponentCss, webcomponentConcat );

const watchTask = ( cb ) => {
	return watch( inputDir + '/**/*.scss', parallel( css, webcomponent ) );
};

exports.default = parallel( css, webcomponent );
exports.watch = watchTask;
exports.css = css;
exports.webcomponent = webcomponent;
