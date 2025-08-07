import { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { Box, Flex, Image, Heading, Stack, Text } from '@chakra-ui/react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { GET_ORDER } from 'src/apollo/orders'
import CustomButton from 'src/components/CustomButton/CustomButton'
import GetContactForm from 'src/components/GetContacForm/GetContactForm'
import PageLoading from 'src/components/PageLoading/PageLoading'
import { useToast } from 'src/components/Toaster'

const ThankYouPage = () => {
  const { orderId } = useParams()
  const { errorToast } = useToast()

  const [emailSent, setEmailSent] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { data, loading: orderLoading } = useQuery(GET_ORDER, {
    variables: { id: orderId },
    onError: () => {
      errorToast('Failed to fetch order details.')
    },
  })

  const order = data?.order

  // Preload the image
  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/success.png'
  }, [])

  const handleGoBack = () => {
    navigate(routes.welcome())
  }

  const handleSaveContact = async (userEmail: string) => {
    const response = await fetch('/.netlify/functions/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        orderId,
        eventName: order.eventName,
        eventDate: order.eventDate,
        amount: order.amount,
      }),
    })

    const result = await response.json()
    if (!response.ok) {
      errorToast(result.message)
      return
    } else {
      setEmailSent(true)
    }
  }

  return (
    <>
      <MetaTags title="Thank you" description="Thank You" />
      <Flex direction="column" h="100vh" align="center" justify="center" px={4} py={10} bg="#FFF4E5" textAlign="center">
        {!orderLoading && (
          <Box mb={6}>
            <Image
              src="/images/success.png"
              alt="Success celebration"
              maxW="300px"
              w="100%"
              onLoad={() => setImageLoaded(true)}
              opacity={imageLoaded ? 1 : 0}
              transition="opacity 0.3s"
              loading="eager" // Force immediate loading
            />
          </Box>
        )}
        <Heading as="h1" size="lg" mb={4}>
          Thank you! Your order is successfully paid 🎉
        </Heading>
        {orderLoading && <PageLoading />}
        {!orderLoading && (
          <Stack mb={6}>
            <Text fontWeight="600" fontSize="xl">
              Enjoy {order.eventName}!
            </Text>
          </Stack>
        )}

        {emailSent ? (
          <Box>
            <Text fontSize="lg">Your ticket is sent!</Text>
          </Box>
        ) : (
          <GetContactForm onSave={handleSaveContact} />
        )}
        <Stack my={[4, 24]}>
          <CustomButton id="navigation-button" buttonText="to main page" onClick={handleGoBack} />
        </Stack>
      </Flex>
    </>
  )
}

export default ThankYouPage
