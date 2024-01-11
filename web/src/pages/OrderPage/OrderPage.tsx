import { Flex, Text, Stack, Button, useMediaQuery, Box } from '@chakra-ui/react'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import useScript from '../../hooks/useScript'
import CustomButton from 'src/components/CustomButton/CustomButton'
import { useMutation } from '@apollo/client'
import { CREATE_PAYMENT } from 'src/apollo/payments'
import { useToast } from 'src/components/Toaster'

const OrderPage = () => {
  const [smallScreen] = useMediaQuery('(max-width: 767px)')
  const { orderId, status, amount } = useParams()
  const { errorToast } = useToast()

  const [createPayment, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PAYMENT, {
    onError: (error) => {
      console.error('Mutation error:', error)
      errorToast('Something went wrong')
      //setLoading(false)
    },

    onCompleted: (data) => {
      console.log('Mutation completed:', data)
    },
  })

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/.redwood/functions/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test request',
          amount, // Dynamically set the amount
          currency: 'SEK',
          market: 'SE',
          lineItems: [
            {
              name: 'The first test item',
              totalAmount: amount, // Dynamically set the amount
              unitPrice: amount, // Dynamically set the amount
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

        // Set the zco-token attribute for the script
        const scriptElement = document.getElementById('zco-loader')
        scriptElement.setAttribute('zco-token', zcoToken)

        console.log(data)
        console.log(data.paymentId)
        // Create the payment input object
        const paymentInput = {
          input: {
            orderId: orderId,
            zaverPaymentId: zaverPaymentId,
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

  useScript({
    src: 'https://iframe-checkout.test.zaver.com/loader/loader-v1.js',
    id: 'zco-loader',
    attributes: { 'zco-token': 'zcoToken' },
  })

  return (
    <>
      <Flex justifyContent={'center'}>
        <Stack>
          <Text>Order ID: {orderId}</Text>
          <Text>Status: {status}</Text>
          <Text>To pay: {amount} SEK</Text>
          <CustomButton id="create-payment-button" buttonText="Pay" onClick={handleButtonClick}></CustomButton>
          <div id="zco-loader"></div>
        </Stack>
      </Flex>
    </>
  )
}

export default OrderPage
