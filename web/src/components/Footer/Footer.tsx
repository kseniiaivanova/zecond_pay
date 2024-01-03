import { Flex, Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex bg={'green'} as="footer" w="100%">
      <Box w="100%">
        <h2>{'Footer'}</h2>
        <p>{'Find me in ./web/src/components/Footer/Footer.tsx'}</p>
      </Box>
    </Flex>
  )
}

export default Footer
