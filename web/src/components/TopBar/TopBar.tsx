import React from 'react'

import { Box, Flex, Link, Text } from '@chakra-ui/react'

import { TopBarTypes } from 'src/types/layout'

import Logo from 'src/components/Logo/Logo'

const dropShadow = {
  backgroundColor: '#ffffff',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
}

const blurEffect = {
  backdropFilter: 'saturate(180%) blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.68)',
}

const TopBar = ({ showDropShadow = true, useBlurEffect = true }: TopBarTypes) => (
  <Flex
    w="100%"
    as="header"
    position="fixed"
    style={{
      ...(showDropShadow && dropShadow),
      ...(useBlurEffect && blurEffect),

      justifyContent: 'center',
      zIndex: 999,
    }}
  >
    <Flex align="start" alignItems="center" height={['80px', '110px']} justify={['space-between']} px="5%" width="100%">
      <Box>
        <Link href="https://drem.se/">
          <Logo />
        </Link>
      </Box>
      <Text>I am the header</Text>
    </Flex>
  </Flex>
)

export default TopBar
