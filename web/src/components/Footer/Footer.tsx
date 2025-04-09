import { Flex, Text, Link, chakra } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex bg="rgba(255, 255, 255, 0.68)" as="footer" w="100%">
      <Flex w="100%" align="center" justify="center" mt={6} p={2}>
        <Text>
          Made on RedwoodJS with{' '}
          <Link href="https://zaver.com" isExternal textDecoration="underline">
            Zaver
          </Link>{' '}
          @2024
        </Text>
      </Flex>
    </Flex>
  )
}

export default Footer
