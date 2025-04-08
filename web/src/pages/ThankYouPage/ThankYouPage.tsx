import { Flex, Heading, Stack, Text, chakra } from '@chakra-ui/react'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import CustomButton from 'src/components/CustomButton/CustomButton'

const ThankYouPage = () => {
  const handleGoBack = () => {
    navigate(routes.welcome())
  }
  return (
    <>
      <MetaTags title="Eventura" description="Thank You" />
      <Flex direction="column" minH="1000px" align="center" justify="flex-start" p={8}>
        <Heading as="h1" size="lg" noOfLines={1} my={8}>
          Thank you! Your order is successfully paid
        </Heading>
        <CustomButton id="navigation-button" buttonText="Go back" onClick={handleGoBack}></CustomButton>
      </Flex>
    </>
  )
}

export default ThankYouPage
