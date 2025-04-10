import React from 'react'

import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { Link } from '@redwoodjs/router'

import { TopBarTypes } from 'src/types/layout'

import Logo from 'src/components/Logo/Logo'

const dropShadow = {
  backgroundColor: '#ffffff',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
}

const TopBar = ({ showDropShadow = true, useBlurEffect = true }: TopBarTypes) => (
  <Flex
    w="100%"
    as="header"
    position="fixed"
    style={{
      ...(showDropShadow && dropShadow),

      justifyContent: 'center',
      zIndex: 999,
    }}
  >
    <Flex
      as={Link}
      to="/"
      alignItems="center"
      height="80px"
      _hover={{ textDecoration: 'none' }}
      justify={['center', 'flex-start', 'flex-start']}
      px="5%"
      width="100%"
    >
      <Box>
        <Logo />
      </Box>
      <Box ml={[2, 4, 4]}>
        <Text fontSize={['4xl', '5xl', '5xl']} fontWeight="700">
          Eventura
        </Text>
      </Box>
    </Flex>
  </Flex>
)

export default TopBar
