import _fs     from 'fs';
import path    from 'path';
import Promise from 'bluebird';
import test    from 'ava';
import { compile, read, fixture, getFiles } from './helpers/helpers';

const fs = Promise.promisifyAll( _fs );


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

		t.true( res.warnings.length === 0 );
		t.true( res.css === expected );

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
