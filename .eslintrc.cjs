/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/base',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    'env': {
        'node': true,
    },
    'rules': {
        'no-fallthrough': 0,
        'no-undef': ['warn'],
        // no-unused-vars rule is disabled because it is already handled by @typescript-eslint/no-unused-vars
        'no-unused-vars': ['off'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'no-constant-condition': 0,
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'never',
        }],
        'vue/comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'never',
        }],
        'vue/order-in-components': ['error'],
        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 1,
            },
            'multiline': {
                'max': 1,
            },
        }],
        'vue/singleline-html-element-content-newline': ['error', {
            'ignoreWhenNoAttributes': false,
            'ignores': ['pre', 'textarea'],
        }],
        'vue/multiline-html-element-content-newline': ['error', {
            'ignores': ['pre', 'textarea'],
        }],
        'vue/multi-word-component-names': 0,
        'vue/require-default-prop': 0,
    },
}
