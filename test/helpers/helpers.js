import _fs     from 'fs';
import path    from 'path';
import Promise from 'bluebird';
import sass    from 'node-sass';

const fs = Promise.promisifyAll( _fs );


// :: ( _path: string ) → string
// Read a file
export const read = ( _path ) => fs.readFileAsync( _path, 'utf-8' );


// :: ( _path: string, ... ) → string
// Get the path to a fixture
export const fixture = ( ...args ) => path.join( __dirname, '../fixtures', ...args );


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


// :: ( str: string, { file: bool } ) → object
// Compile a Sass string or file `str`
export const compile = ( str, { file = true } = {} ) => {
	return new Promise(( resolve, reject ) => {
		const warnings = [];

		const opts = {
			outputStyle : 'compact',

			includePaths : [
				path.join( __dirname, '../..' ),
				path.join( __dirname, '../../functions' ),
				path.join( __dirname, '../../mixins' ),
			],

			// https://github.com/sass/node-sass/issues/646#issuecomment-86935176
			functions    : {
				'@warn' : ( warning ) => {
					warnings.push( warning.getValue() );
					return sass.NULL;
				}
			}
		};

		if ( file ) {
			opts.file = str;
		} else {
			opts.data = str;
		}

		sass.render( opts, ( err, res ) => {
			if ( err ) {
				// console.log( err );
				const formatted = `${err.file}:${err.line}: ${err.message}`;
				return reject( new Error( formatted ) );
			}

			res.warnings = warnings;
			res.css      = res.css.toString();

			// console.log( res.css );
			return resolve( res );
		});
	});
};
