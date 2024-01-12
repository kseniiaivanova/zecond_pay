import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

const ZecPaySVG = () => (
  <svg width="80px" height="126px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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

interface LogoProps extends BoxProps {
  size?: string | string[]
}

const Logo = ({ size = '100px', ...props }: LogoProps) => {
  return (
    <Box w="100%" maxW={size} {...props}>
      <ZecPaySVG />
    </Box>
  )
}
export default Logo
