import _fs     from 'fs';
import path    from 'path';
import Promise from 'bluebird';
import test    from 'ava';
import { compile, read, fixture } from './helpers/helpers';

const fs = Promise.promisifyAll( _fs );

let testFiles;


const getFiles = async () => {
	const testsPath = path.join( __dirname, '../functions' );
	return await fs.readdirAsync( testsPath )
		.then(( _files ) => {
			// remove ext
			_files = _files.map( f => f.replace( path.extname( f ), '' ) );

			// remove leading `_`
			_files = _files.map( f => f.substring( 1 ) );
			return _files;
		});

};


const macro = async ( t, file ) => {
	// console.log( `Start '${file}.scss'...` );

	const src      = fixture( `/input/functions/_${file}.scss` );
	const expected = read( fixture( `/expected/functions/${file}.css` ) );

	// console.log( `Testing '${file}.scss'...` );
	const res = await compile( src );
	t.is( res.css, expected );
	// console.log( `Done '${file}.scss'...\n\n` );
};

macro.title = ( providedTitle, file ) => `${providedTitle}: ${file}`;


const init = async () => {
	testFiles = await getFiles();
	testFiles.forEach( ( file ) => {
		test( 'function returns an expected value', macro, file );
	});
};

init();
