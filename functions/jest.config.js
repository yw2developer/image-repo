module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: 'src(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	testPathIgnorePatterns: ['lib/', 'node_modules/', 'src/__tests__/data/*'],
	moduleFileExtensions: ['js','ts','tsx','jsx','json','node'],
	rootDir: 'src'
};
