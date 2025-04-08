import React from 'react'

import { Box, Flex, Text, chakra } from '@chakra-ui/react'

import { TopBarTypes } from 'src/types/layout'

import Logo from 'src/components/Logo/Logo'

const dropShadow = {
  backgroundColor: '#ffffff',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
}

const blurEffect = {
  backdropFilter: 'saturate(180%) blur(5px)',
  backgroundColor: 'rgba(231, 231, 235, 0.68)',
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
    <Flex align="start" alignItems="center" height={['110px', '110px']} justify={['flex-start']} px="5%" width="100%">
      <Box>
        <Logo />
      </Box>
      <Box ml={[6, 4, 4]}>
        <Text fontSize="5xl" fontWeight="700">
          Eventura
        </Text>
      </Box>
    </Flex>
  </Flex>
)

export default TopBar
