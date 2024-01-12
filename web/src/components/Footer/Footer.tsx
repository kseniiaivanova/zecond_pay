import { Flex, Box, Text, Link, chakra } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex bg="rgba(255, 255, 255, 0.68)" as="footer" w="100%">
      <Flex w="100%" align="center" justify="space-between" p={2}>
        <Link p={4} href="https://zaver.com" isExternal>
          <chakra.b fontSize="xl"> Zaver</chakra.b>
        </Link>
        <Text>Made on RedwoodJS@2024</Text>
      </Flex>
    </Flex>
  )
}

export default Footer
