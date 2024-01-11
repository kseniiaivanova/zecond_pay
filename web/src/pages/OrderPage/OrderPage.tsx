import { Flex, Text, Stack, Button, useMediaQuery, Box } from '@chakra-ui/react'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import useScript from '../../hooks/useScript'
import CustomButton from 'src/components/CustomButton/CustomButton'
import { useMutation } from '@apollo/client'
import { CREATE_PAYMENT, UPDATE_PAYMENT } from 'src/apollo/payments'
import { useToast } from 'src/components/Toaster'

const OrderPage = () => {
  const [smallScreen] = useMediaQuery('(max-width: 767px)')
  const { orderId, status, amount } = useParams()
  const { errorToast } = useToast()

  const [createPayment] = useMutation(CREATE_PAYMENT, {
    onError: (error) => {
      console.error('Mutation error:', error)
      errorToast('Something went wrong')
    },

    onCompleted: (data) => {
      console.log('Mutation completed:', data)
    },
  })

  const [updatePayment] = useMutation(UPDATE_PAYMENT, {
    onError: (error) => {
      console.error('Mutation error:', error)
      // Handle error, e.g., display a toast
    },

    onCompleted: (data) => {
      console.log('Mutation completed:', data)
      // Handle successful completion, if needed
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
          amount,
          currency: 'SEK',
          market: 'SE',
          lineItems: [
            {
              name: 'The first test item',
              totalAmount: amount,
              unitPrice: amount,
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
        const paymentStatus = data.paymentStatus

        // Set the zco-token attribute for the script
        const scriptElement = document.getElementById('zco-loader')
        scriptElement.setAttribute('zco-token', zcoToken)

        console.log(data)
        console.log(data.paymentId)
        console.log(paymentStatus)
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
