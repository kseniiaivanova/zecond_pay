import React from 'react'

import { useMutation } from '@apollo/client'
import { Flex } from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { CREATE_ORDER } from 'src/apollo/orders'
import EventCard from 'src/components/EventCard/EventCard'
import { useToast } from 'src/components/Toaster'

const MainPage = () => {
  const { errorToast } = useToast()

  const [createOrder] = useMutation(CREATE_ORDER, {
    onError: (_error) => {
      errorToast('Something went wrong')
    },
    onCompleted: (data) => {
      navigate(routes.order({ orderId: data.createOrder.id }))
    },
  })

  const handlePurchase = (event) => {
    createOrder({
      variables: {
        input: {
          status: 'CREATED',
          amount: event.price,
          paymentId: new Date().toISOString(),
          orderedAt: new Date().toISOString(),
          paidAt: null,
          eventId: event.id,
          eventName: event.title,
          eventLocation: event.location,
          eventDate: event.date,
        },
      },
    })
  }

  return (
    <>
      <MetaTags title="Home" description="Your event ticket checkout" />
      <Flex direction="column" alignItems="center" minH="100vh">
        <EventCard handleCreateOrder={handlePurchase} />
      </Flex>
    </>
  )
}

export default MainPage
