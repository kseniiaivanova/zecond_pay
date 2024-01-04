import { Flex } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import GetOrderForm from 'src/components/GetOrderForm/GetOrderForm'
import { OrderInputValue } from 'src/types/orderInput'
import { useQuery } from '@apollo/client'
import { GET_ORDER } from 'src/apollo/orders'

const MainPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<OrderInputValue | null>(null)

  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery(GET_ORDER, {
    variables: { id: value?.orderId || '' },
    skip: !value || !value.orderId,
    onError: (error) => {
      console.error('Error fetching order:', error)
      setLoading(false)
    },
  })

  const onSave = (value: OrderInputValue) => {
    setValue(value)
    setFormSubmitted(true)
  }

  // Update loading state based on the query loading state
  useEffect(() => {
    setLoading(queryLoading)
  }, [queryLoading])

  // Update state when data is available
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
        <GetOrderForm loading={loading} onSave={onSave} savedValue={value} />
      </Flex>
    </>
  )
}

export default MainPage
