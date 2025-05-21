import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { Flex, Text, Heading, chakra, VStack, Box } from '@chakra-ui/react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { GET_ORDER } from 'src/apollo/orders'
import { CREATE_PAYMENT } from 'src/apollo/payments'
import CustomButton from 'src/components/CustomButton/CustomButton'
import PageLoading from 'src/components/PageLoading/PageLoading'
import { useToast } from 'src/components/Toaster'

import useScript from '../../hooks/useScript'

const OrderPage = () => {
  const { orderId } = useParams()
  const { errorToast } = useToast()
  const [isPaymentCreated, setIsPaymentCreated] = useState(false)
  const [paymentData, setPaymentData] = useState(null)

  const { data, loading: orderLoading } = useQuery(GET_ORDER, {
    variables: { id: orderId },
    onError: () => {
      errorToast('Failed to fetch order details.')
    },
  })

  const order = data?.order

  const [createPayment] = useMutation(CREATE_PAYMENT, {
    onError: () => {
      errorToast('Failed to create payment')
    },

    onCompleted: (data) => {
      setIsPaymentCreated(true)
    },
  })

  // Load the script first with a placeholder token
  useScript({
    src: 'https://iframe-checkout.test.zaver.com/loader/loader-v1.js',
    id: 'zco-loader',
    attributes: { 'zco-token': paymentData?.token || 'placeholder' },
  })

  // Update the token when payment data is available
  useEffect(() => {
    if (paymentData?.token) {
      const scriptElement = document.getElementById('zco-loader')
      if (scriptElement) {
        scriptElement.setAttribute('zco-token', paymentData.token)
      }
    }
  }, [paymentData?.token])

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/.netlify/functions/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test request',
          amount: order.amount,
          currency: 'SEK',
          market: 'SE',
          lineItems: [
            {
              name: 'The first test item',
              totalAmount: order.amount,
              unitPrice: order.amount,
              quantity: 1,
              taxRatePercent: 6.0,
            },
          ],
        }),
      })

      if (response.ok) {
        const data = await response.json()

        // Set payment data
        setPaymentData({
          token: data.token,
          paymentId: data.paymentId,
          status: data.paymentStatus,
        })

        // Create the payment input object
        const paymentInput = {
          input: {
            orderId: orderId,
            zaverPaymentId: data.paymentId,
            paymentStatus: data.paymentStatus,
          },
        }

        // Call the GraphQL mutation with the payment input
        createPayment({ variables: paymentInput })
      }
    } catch (error) {
      console.error('An error occurred during fetch:', error)
    }
  }

  // Payment status check effect
  useEffect(() => {
    if (!paymentData?.paymentId) return

    const interval = setInterval(async () => {
      const response = await fetch('/.netlify/functions/checkPaymentStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId: paymentData.paymentId }),
      })

      const result = await response.json()
      if (result.status === 'SETTLED') {
        clearInterval(interval)
        navigate(`/thank-you?orderId=${orderId}`)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [paymentData?.paymentId, orderId])

  const handleGoBack = () => {
    navigate(routes.welcome())
  }

  return (
    <>
      <MetaTags title="Order" description="Order summary" />
      <Flex direction="column" minH="100vh" align="center" justify="flex-start" px={4} py={10}>
        {orderLoading && <PageLoading />}
        {!orderLoading && (
          <>
            <Heading as="h1" size="lg" mb={6} textAlign="center" color="gray.800">
              Order Summary
            </Heading>

            <Flex
              bg="white"
              direction="column"
              p={8}
              borderRadius="lg"
              boxShadow="xl"
              w="full"
              maxW="lg"
              align="center"
              justify="center"
            >
              <VStack spacing={6} align="stretch" mt={4}>
                <Text fontSize="md" color="gray.600">
                  <chakra.b>Order ID:</chakra.b> {orderId}
                </Text>
                <Text fontSize="md" color="gray.600">
                  <chakra.b>Event:</chakra.b> {order.eventName}
                </Text>
                <Text fontSize="md" color="gray.600">
                  <chakra.b>Location:</chakra.b> {order.eventLocation}
                </Text>
                <Text fontSize="md" color="gray.600">
                  <chakra.b>Date:</chakra.b> {order.eventDate}
                </Text>
                <Text fontSize="md" color="gray.600">
                  <chakra.b>Status:</chakra.b> {order.status}
                </Text>
                {order.status === 'CREATED' && !isPaymentCreated && (
                  <Text fontSize="md" color="gray.600">
                    <chakra.b>Amount to Pay:</chakra.b> {order.amount} SEK
                  </Text>
                )}
              </VStack>
              <Box id="zco-loader" mt={6}></Box>
            </Flex>

            <VStack spacing={6} mt={10} align="center">
              {order.status === 'CREATED' && !isPaymentCreated && (
                <CustomButton id="create-payment-button" buttonText="Pay" onClick={handleButtonClick} />
              )}
              <CustomButton id="navigation-button" buttonText="Go back" onClick={handleGoBack} />
            </VStack>
          </>
        )}
      </Flex>
    </>
  )
}
export default OrderPage
