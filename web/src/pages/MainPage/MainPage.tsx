import React from 'react'

import { useMutation } from '@apollo/client'
import { Flex } from '@chakra-ui/react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { CREATE_ORDER } from 'src/apollo/orders'
import EventCard from 'src/components/EventCard/EventCard'
import { useToast } from 'src/components/Toaster'

const MainPage = () => {
  const handlePurchase = (event) => {
    navigate(routes.order({ eventId: event.id }))
  }

  return (
    <>
      <MetaTags title="Home" description="Your event ticket checkout" />
      <Flex direction="column" alignItems="center" minH="100vh">
        <EventCard handleCheckout={handlePurchase} />
      </Flex>
    </>
  )
}

export default MainPage
