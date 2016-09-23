import _fs     from 'fs';
import path    from 'path';
import Promise from 'bluebird';
import test    from 'ava';
import { compile, read, fixture, getFiles } from './helpers/helpers';

const fs = Promise.promisifyAll( _fs );
const debug = require( 'debug' )( 'sass-kit:tests' );


// :: ( t: AVA instance, input: string, expected: string ) → null
// Macro to check the compiled contents matches an expected value
const compiledMatchesExpectedMacro = async ( t, input, expected ) => {
	debug( 'compiledMatchesExpectedMacro: start', { input, expected } );

	const src              = input;
	const expectedContents = await read( expected );

	const res = await compile( src );

	debug( 'compiledMatchesExpectedMacro: results', { input, expected, res } );

	t.true( res.css === expectedContents );
};

compiledMatchesExpectedMacro.title = ( providedTitle, input ) => `compiled matches expected: ${providedTitle}`;


// :: ( t: AVA instance, input: string, expected: string ) → null
// Macro to check a file compiles without errors or warnings
const compilesSuccessfullyMacro = async ( t, input, expected ) => {
	debug( 'compilesSuccessfullyMacro: start', { input, expected } );

	let res;
	let errors = false;

	const src = input;

	try {
		res = await compile( src );
	} catch ( err ) {
		errors = err.message;
		debug( 'compilesSuccessfullyMacro: errors', { input, expected, err } );
	}

	debug( 'compilesSuccessfullyMacro: results', { input, expected, res, errors } );

	t.true( errors === false );
	t.true( res.warnings.length === 0 );
};

compilesSuccessfullyMacro.title = ( providedTitle, input ) => `compiles without errors or warnings: ${providedTitle}`;


// :: (  ) → null
// Programatically create the tests
const runProgramaticTests = async () => {
	const functionFiles = await getFiles( 'functions' );

	functionFiles.forEach( ( file ) => {
		test( `function '${file}'`, [ compilesSuccessfullyMacro, compiledMatchesExpectedMacro ], fixture( `/input/functions/_${file}.scss` ), fixture( `/expected/functions/${file}.css` ) );
	});
};

runProgramaticTests();


test( `compiles with zero output: '_index.scss'`, async t => {
	const src = path.join( __dirname, '../_index.scss' );
	const res = await compile( src );

	t.true( res.css === '' );
});


test( `'_index.scss'`, compilesSuccessfullyMacro, path.join( __dirname, '../_index.scss' ) );
