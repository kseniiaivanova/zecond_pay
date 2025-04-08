import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {
    colors: {
      grey: {
        25: '#f3f3f3',
        50: '#ededed',
        100: '#dddddd',
        200: '#cdcdcd',
        300: '#bdbdbd',
        400: '#9d9d9d',
        500: '#7d7d7d',
        600: '#6d6d6d',
        700: '#5d5d5d',
        800: '#4d4d4d',
        900: '#3d3d3d',
        950: '#2d2d2d',
      },

        blue: {
          25: '#f0f7ff',
          50: '#e0efff',
          100: '#b8dcff',
          200: '#8fcaff',
          300: '#66b7ff',
          400: '#3da4ff',
          500: '#1491ff',
          600: '#0f75cc',
          700: '#0b5999',
          800: '#073d66',
          900: '#042033',
          950: '#02101a',
        },
    },

    fonts: {
      heading: `'Raleway', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
  },
)
