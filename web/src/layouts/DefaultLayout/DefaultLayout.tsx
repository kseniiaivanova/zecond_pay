import { Box } from '@chakra-ui/react'
import React from 'react'

import Footer from 'src/components/Footer/Footer'
import TopBar from 'src/components/TopBar/TopBar'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Box height="100vh" overflow="auto" w="100%">
      <TopBar />
      <Box as="main" overflowX="hidden" bg="white" pt={['80px', '110px']}>
        {children}
        <Footer />
      </Box>
    </Box>
  )
}

export default DefaultLayout
