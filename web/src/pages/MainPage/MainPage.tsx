import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import GetOrderForm from 'src/components/GetOrderForm/GetOrderForm'

import { OrderInputValue } from 'src/types/orderInput'
import { GET_ORDER } from 'src/apollo/orders'
import { useQuery } from '@apollo/client'
import { useToast } from 'src/components/Toaster'

const MainPage = () => {
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
      errorToast('id not found, try again!')
      setLoading(false)
    },
  })

  const onSave = (value: OrderInputValue) => {
    setValue(value)
    setFormSubmitted(true)
  }

  useEffect(() => {
    setLoading(queryLoading)
  }, [queryLoading])

  useEffect(() => {
    if (data && data.getOrder) {
      setValue(data.getOrder)
      setLoading(false)
      setFormSubmitted(true)
    }
  }, [data])

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
