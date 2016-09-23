module.exports = {
	extends : [
		'@methodgrab/standard',
		'@methodgrab/standard/esnext',
	],

	parser: 'babel-eslint',

	rules : {
		'no-param-reassign'      : 'off',

		// https://github.com/eslint/eslint/issues/7012
		// https://github.com/eslint/eslint/issues/6274
		'generator-star-spacing' : 'off',
	},
};
