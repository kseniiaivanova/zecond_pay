import { Flex, Spinner } from '@chakra-ui/react'

const PageLoading = () => (
  <Flex alignItems="center" bg="whiteAlpha.700" justifyContent="center" inset={0} position="fixed" zIndex={1}>
    <Spinner color="purple" size="xl" />
  </Flex>
)

export default PageLoading
