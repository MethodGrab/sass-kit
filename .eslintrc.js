module.exports = {
	extends : [
		'@methodgrab/standard',
		'@methodgrab/standard/esnext',
	],

	parser: 'babel-eslint',

	rules : {
		'quotes'                 : [ 'error', 'single', { allowTemplateLiterals: true } ],
		'no-param-reassign'      : 'off',

		// https://github.com/eslint/eslint/issues/7012
		// https://github.com/eslint/eslint/issues/6274
		'generator-star-spacing' : 'off',
	},
};
