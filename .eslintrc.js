// .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier' // prettier 설정과 충돌 방지
    ],
    plugins: ['react', '@typescript-eslint', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'prettier/prettier': 'warn', // prettier 관련 규칙은 경고로 표시
        'react/react-in-jsx-scope': 'off' // React 17+ 사용 시 필요 없음
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
