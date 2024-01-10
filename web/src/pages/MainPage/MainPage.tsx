import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import React, { useContext, useState } from 'react'

import { OrderInputValue } from 'src/types/orderInput'
import { GET_ORDER } from 'src/apollo/orders'
import { useQuery } from '@apollo/client'
import GetOrderForm from 'src/components/GetOrderForm/GetOrderForm'
import { useToast } from 'src/components/Toaster'

const MainPage = () => {
  //const { setOrderStatus } = useContext(OrderContext)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<OrderInputValue | null>(null)
  const { errorToast } = useToast()

  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery(GET_ORDER, {
    variables: { id: value?.orderId || '' },
    skip: !value || !value.orderId,

    onError: (error) => {
      errorToast('Something went wrong')
      setLoading(false)
    },

    onCompleted: (data) => {
      if (data && data.getOrder) {
        setValue(data.getOrder)
        setLoading(false)
        setFormSubmitted(true)

        // Navigate to the order page
        navigate(
          routes.order({ orderId: data.getOrder.id, status: data.getOrder.status, amount: data.getOrder.amount })
        )
      } else {
        errorToast('ID not found, try again!')
        setLoading(false)
      }
    },
  })

  const onSave = (value: OrderInputValue) => {
    setValue(value)
    setFormSubmitted(true)
  }

  return (
    <>
      <MetaTags title="Main" description="Main page" />
      <Flex w="100%">
        {loading && <Spinner />}
        <GetOrderForm loading={loading} onSave={onSave} savedValue={value}></GetOrderForm>
      </Flex>
    </>
  )
}

export default MainPage
