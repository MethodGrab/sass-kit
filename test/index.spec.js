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
const individualFileMacro = ( type ) => {

	// :: ( t: AVA instance, file: string ) → null
	// The actual AVA macro function
	const _individualFileMacro = async ( t, file ) => {
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

	_individualFileMacro.title = ( providedTitle, file ) => `${providedTitle}: ${file}`;

	return _individualFileMacro;

};


// :: ( t: AVA instance, file: string ) → null
// Macro to check a file compiles without errors or warnings
const compilesSuccessfullyMacro = async ( t, input, expected ) => {
	let res;
	let errors = false;

	const src = path.join( __dirname, '../', input );

	try {
		res = await compile( src );
	} catch ( err ) {
		errors = err.message;
	}

	t.true( errors === false );
	t.true( res.warnings.length === 0 );
};

compilesSuccessfullyMacro.title = ( providedTitle, input ) => `compiles without errors or warnings: ${input}`;


// :: (  ) → null
// Programatically create the tests
const runProgramaticTests = async () => {
	const functionFiles = await getFiles( 'functions' );
	const functionMacro = individualFileMacro( 'functions' );

	functionFiles.forEach( ( file ) => {
		test( 'function returns an expected value', functionMacro, file );
	});
};

runProgramaticTests();


test( 'compiles with zero output: _index.scss', async t => {
	const src = path.join( __dirname, '../_index.scss' );
	const res = await compile( src );

	t.true( res.css === '' );
});


test( compilesSuccessfullyMacro, '_index.scss' );
