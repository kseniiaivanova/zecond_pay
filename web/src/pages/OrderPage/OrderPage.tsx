import { Flex, Text, Stack, Button, useMediaQuery, Box } from '@chakra-ui/react'
import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags, Head } from '@redwoodjs/web'
import { useEffect } from 'react'
import useScript from '../../hooks/useScript'

const OrderPage = () => {
  useScript({
    src: 'https://iframe-checkout.test.zaver.com/loader/loader-v1.js',
    id: 'zco-loader',
    attributes: { 'zco-token': 'emNvdG9rOGRhNTU0ZWMtMmVhMi00MjZmLTg4ZDUtOWUzYzA5NzU3Zjli' },
  })

  const [smallScreen] = useMediaQuery('(max-width: 767px)')
  const { orderId, status, amount } = useParams()

  // Api call till din nya function

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:8911/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
      } else {
        console.error('Fetch failed:', response.statusText)
      }
    } catch (error) {
      console.error('An error occurred during fetch:', error)
    }
  }

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
