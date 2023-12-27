module.exports = {
    "extends": "eslint:recommended",
    "plugins": ["node"],
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "es6":true
    },
    "overrides": [
        {
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
