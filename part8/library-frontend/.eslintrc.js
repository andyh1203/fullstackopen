module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "no-console": 0,
        "react/prop-types": 0
    }
};