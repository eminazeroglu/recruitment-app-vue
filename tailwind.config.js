const _ = require('lodash')
const plugin = require('tailwindcss/plugin')

module.exports = {
    purge: {content: ['./public/**/*.html', './src/**/*.vue']},
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                '300px': '300px',
                '640px': '640px',
                '768px': '768px',
                '1024px': '1024px',
                '1280px': '1280px',
                '1536px': '1536px',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
        plugin(function ({addUtilities, theme, e}) {
            const calcUtilities = _.map(theme('spacing'), (value, key) => {
                return {
                    [`.${e(`-calc-h-full-${key}`)}`]: {
                        height: `calc(100% - ${value})`
                    },
                    [`.${e(`-calc-w-full-${key}`)}`]: {
                        width: `calc(100% - ${value})`
                    },
                    [`.${e(`-calc-max-h-full-${key}`)}`]: {
                        maxHeight: `calc(100% - ${value})`
                    },
                    [`.${e(`-calc-max-w-full-${key}`)}`]: {
                        maxWidth: `calc(100% - ${value})`
                    },
                    [`.${e(`-calc-min-h-full-${key}`)}`]: {
                        minHeight: `calc(100% - ${value})`
                    },
                    [`.${e(`-calc-min-w-full-${key}`)}`]: {
                        minWidth: `calc(100% - ${value})`
                    },
                    [`.${e(`calc-h-full-${key}`)}`]: {
                        height: `calc(100% + ${value})`
                    },
                    [`.${e(`calc-w-full-${key}`)}`]: {
                        width: `calc(100% + ${value})`
                    },
                    [`.${e(`calc-max-h-full-${key}`)}`]: {
                        maxHeight: `calc(100% + ${value})`
                    },
                    [`.${e(`calc-max-w-full-${key}`)}`]: {
                        maxWidth: `calc(100% + ${value})`
                    },
                    [`.${e(`calc-min-h-full-${key}`)}`]: {
                        minHeight: `calc(100% + ${value})`
                    },
                    [`.${e(`calc-min-w-full-${key}`)}`]: {
                        minWidth: `calc(100% + ${value})`
                    },
                    [`.${e(`min-h-${key}`)}`]: {
                        minHeight: `${value}`
                    },
                    [`.${e(`max-h-${key}`)}`]: {
                        maxHeight: `${value}`
                    },
                    [`.${e(`min-w-${key}`)}`]: {
                        minWidth: `${value}`
                    },
                    [`.${e(`max-w-${key}`)}`]: {
                        maxWidth: `${value}`
                    }
                }
            })

            addUtilities(calcUtilities, {
                variants: ['responsive', 'hover', 'focus'],
            })
        })
    ],
}
