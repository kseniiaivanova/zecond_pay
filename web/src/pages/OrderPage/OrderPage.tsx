import { Flex, Text, Stack, Button, useMediaQuery, Box } from '@chakra-ui/react'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags, Head } from '@redwoodjs/web'
import { useEffect } from 'react'
import useScript from '../../hooks/useScript'

const OrderPage = () => {
  const [smallScreen] = useMediaQuery('(max-width: 767px)')
  const { orderId, status, amount } = useParams()

  // Api call till din nya function

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/.redwood/functions/createPayment', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        const zcoToken = data.token
        console.log(zcoToken)

        // Set the zco-token attribute for the script
        const scriptElement = document.getElementById('zco-loader')
        scriptElement.setAttribute('zco-token', zcoToken)

        console.log(data)
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
          <button onClick={handleButtonClick}>Pay</button>
        </Stack>
        <div id="zco-loader"></div>
      </Flex>
    </>
  )
}

export default OrderPage
