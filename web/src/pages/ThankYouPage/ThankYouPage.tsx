import { Box, Flex, Image, Heading } from '@chakra-ui/react'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import CustomButton from 'src/components/CustomButton/CustomButton'

const ThankYouPage = () => {
  const handleGoBack = () => {
    navigate(routes.welcome())
  }
  return (
    <>
      <MetaTags title="Thank you" description="Thank You" />

      <Flex
        direction="column"
        minH="100vh"
        align="center"
        justify="center"
        px={4}
        py={10}
        bg="#FFF4E5"
        textAlign="center"
      >
        <Box mb={6}>
          <Image src="/images/success.png" alt="Success celebration" maxW="300px" w="100%" />
        </Box>

        <Heading as="h1" size="lg" mb={6}>
          Thank you! Your order is successfully paid 🎉
        </Heading>

        <CustomButton id="navigation-button" buttonText="Go back" onClick={handleGoBack} />
      </Flex>
    </>
  )
}

export default ThankYouPage
