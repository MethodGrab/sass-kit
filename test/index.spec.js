import _fs     from 'fs';
import path    from 'path';
import Promise from 'bluebird';
import test    from 'ava';
import { compile, read, fixture } from './helpers/helpers';

const fs = Promise.promisifyAll( _fs );


// :: ( type: string ) → array
// Get a list of files in a directory
const getFiles = async ( type ) => {
	const testsPath = path.join( __dirname, '../', type );

	let files = await fs.readdirAsync( testsPath );

	files = files
		// remove ext
		.map( f => f.replace( path.extname( f ), '' ) )

		// remove leading `_`
		.map( f => f.substring( 1 ) )

		// filter indexes
		.filter( f => f !== 'index' );

	return files;

};


// :: ( type: string ) → function
// Create an AVA test macro function thats asserts
// 1) No warnings are thrown
// 2) The compiled CSS matches the expected CSS
const macro = ( type ) => {

	// :: ( t: AVA instance, file: string ) → null
	// The actual AVA macro function
	const _macro = async ( t, file ) => {
		// console.log( `Start '${file}.scss'...` );

		const src      = fixture( `/input/${type}/_${file}.scss` );
		const expected = await read( fixture( `/expected/${type}/${file}.css` ) );

		// console.log( `Compiling '${file}.scss'...` );

		const res = await compile( src );

		// console.log( `Compiled output of '${file}.scss':`, `\n---\n${res.css}\n---\n` );

		t.is( res.warnings.length, 0 );
		t.is( res.css, expected );

		// console.log( `Done '${file}.scss'...\n\n` );
	};

	_macro.title = ( providedTitle, file ) => `${providedTitle}: ${file}`;

	return _macro;

};


// :: (  ) → null
// Programatically create the tests
const init = async () => {
	const functionFiles = await getFiles( 'functions' );
	const functionMacro = macro( 'functions' );

	functionFiles.forEach( ( file ) => {
		test( 'function returns an expected value', functionMacro, file );
	});
};

init();
