import { Flex, Text, Heading, chakra, VStack, Box } from '@chakra-ui/react'
import { navigate, routes, useParams } from '@redwoodjs/router'
import useScript from '../../hooks/useScript'
import CustomButton from 'src/components/CustomButton/CustomButton'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_PAYMENT } from 'src/apollo/payments'
import { useToast } from 'src/components/Toaster'
import { useEffect, useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { GET_ORDER } from 'src/apollo/orders'
import PageLoading from 'src/components/PageLoading/PageLoading'

const OrderPage = () => {
  const { orderId } = useParams()
  const { errorToast } = useToast()
  const [isPaymentCreated, setIsPaymentCreated] = useState(false)
  const [zaverPaymentId, setZaverPaymentId] = useState(null)

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

  useEffect(() => {
    if (!zaverPaymentId) return

    const interval = setInterval(async () => {
      const response = await fetch('/.netlify/functions/checkPaymentStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId: zaverPaymentId }),
      })

      const result = await response.json()
      if (result.status === 'SETTLED') {
        clearInterval(interval)
        navigate(`/thank-you?orderId=${orderId}`)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [zaverPaymentId])

  useScript({
    src: 'https://iframe-checkout.test.zaver.com/loader/loader-v1.js',
    id: 'zco-loader',
    attributes: { 'zco-token': 'zco-token' },
  })

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
        const zcoToken = data.token
        const zaverPaymentId = data.paymentId
        setZaverPaymentId(zaverPaymentId)

        const paymentStatus = data.paymentStatus

        // Set the zco-token attribute for the script

        const scriptElement = document.getElementById('zco-loader')
        scriptElement.setAttribute('zco-token', zcoToken)

        // Create the payment input object
        const paymentInput = {
          input: {
            orderId: orderId,
            zaverPaymentId: zaverPaymentId,
            paymentStatus: paymentStatus,
          },
        }

        // Call the GraphQL mutation with the payment input
        createPayment({ variables: paymentInput })
      } else {
        console.error('Fetch failed:', response.statusText)
      }
    } catch (error) {
      console.error('An error occurred during fetch:', error)
    }
  }

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
