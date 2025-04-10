import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

const ZecPaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-zap-icon lucide-zap"
  >
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
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
