import _fs     from 'fs';
import path    from 'path';
import Promise from 'bluebird';
import test    from 'ava';
import { compile, read, fixture, getFilesSync } from './helpers/helpers';

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
	// console.log( `Compiled output of '${input}':`, `\n---\n${res.css}\n---\n` );

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
	t.true( res.warnings.length === 0, res.warnings );
};

compilesSuccessfullyMacro.title = ( providedTitle, input ) => `compiles without errors or warnings: ${providedTitle}`;


const functionFiles = getFilesSync( 'functions' );

functionFiles.forEach( file => {
	test( `function '${file}'`, [ compilesSuccessfullyMacro, compiledMatchesExpectedMacro ], fixture( `/input/functions/_${file}.scss` ), fixture( `/expected/functions/${file}.css` ) );
});


test( `compiles with zero output: '_index.scss'`, async t => {
	const src = path.join( __dirname, '../_index.scss' );
	const res = await compile( src );

	t.true( res.css === '' );
});


test( `'_index.scss'`, compilesSuccessfullyMacro, path.join( __dirname, '../_index.scss' ) );


test( `mixin '_font-face.scss'`, [ compilesSuccessfullyMacro, compiledMatchesExpectedMacro ], fixture( `/input/mixins/_font-face.scss` ), fixture( `/expected/mixins/font-face.css` ) );


test( `mixin '_responsive.scss'`, [ compilesSuccessfullyMacro, compiledMatchesExpectedMacro ], fixture( `/input/mixins/_responsive-basic.scss` ), fixture( `/expected/mixins/responsive-basic.css` ) );


test( `compiles with a warning when no ems function provided: '_responsive.scss'`, async t => {
	const src      = fixture( '/input/mixins/_responsive-ems-error.scss' );
	const expected = await read( fixture( '/expected/mixins/responsive-ems-error.css' ) );
	const res      = await compile( src );

	t.true( res.css === expected );
	t.true( res.warnings.length === 1, res.warnings );
	t.true( res.warnings[0] === '[responsive.scss] Cannot convert to ems, missing `em` function.' );
});


test( `compiles with a warning when breakpoints are incorrectly ordered: '_responsive.scss'`, async t => {
	const src      = fixture( '/input/mixins/_responsive-breakpoint-order.scss' );
	const expected = await read( fixture( '/expected/mixins/responsive-breakpoint-order.css' ) );
	const res      = await compile( src );

	t.true( res.css === expected );
	t.true( res.warnings.length === 1, res.warnings );
	t.true( res.warnings[0] === '[responsive.scss] The start breakpoint (1024px) is larger than the end breakpoint (640px). Are these the right way round?' );
});
