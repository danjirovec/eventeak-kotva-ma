module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'expo',
    'prettier',
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
  },
};
