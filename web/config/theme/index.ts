import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const theme = extendTheme(
  {

    fonts: {
      heading: `'Roboto', sans-serif`,
      body: `'Roboto', sans-serif`,
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
)
