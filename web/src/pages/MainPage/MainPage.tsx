import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import React, { useContext, useState } from 'react'

import { useMutation } from '@apollo/client'

import { CREATE_ORDER } from 'src/apollo/orders'
import { useToast } from 'src/components/Toaster'
import EventCard from 'src/components/EventCard/EventCard'

const MainPage = () => {
  const { errorToast } = useToast()

  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER, {
    onError: (error) => {
      errorToast('Something went wrong')
    },
    onCompleted: (data) => {
      console.log('Order created:', data)
      navigate(
        routes.order({
          orderId: data.createOrder.id,
          status: data.createOrder.status,
          amount: data.createOrder.amount,
          eventName: data.createOrder.eventName,
        })
      )
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
