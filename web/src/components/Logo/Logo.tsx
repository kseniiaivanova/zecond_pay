import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

const ZecPaySVG = () => (
  <svg width="100px" height="156px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31 4H16L10 27H18L14 44L40 16H28L31 4Z"
      fill="#2F88FF"
      stroke="#000000"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M21 11L19 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

const Logo = (props: BoxProps) => {
  return (
    <Box w="100%" maxW={['100px', '100px']} {...props}>
      <ZecPaySVG />
    </Box>
  )
}

export default Logo
