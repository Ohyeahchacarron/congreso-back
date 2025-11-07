module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,json,png,svg,md,jsx,css,lock}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};