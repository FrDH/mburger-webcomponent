/*
	Tasks:

	$ gulp 					: Runs "css" tasks.
	$ gulp watch			: Starts a watch on "css" tasks.
*/


var { src, dest, watch } = require( 'gulp' );

var sass 		= require( 'gulp-sass' ),
	cleancss	= require( 'gulp-clean-css' );


var inputDir 	= 'src',
	outputDir 	= 'dist';




/*
	$ gulp
*/
const defaultTask = ( cb ) => {
	return css( cb );
};
exports.default = defaultTask;


/*
	$ gulp watch
*/
const watchTask = ( cb ) => {
	return watch( inputDir + '/**/*.scss', css );
};
exports.watch = watchTask;



/*
	CSS tasks.
*/

// Compile and concatenate all SCSS files to CSS.
const css = ( cb ) => {

	return src( inputDir + '/*.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( cleancss() )
		.pipe( dest( outputDir ) );
};

