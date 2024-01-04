import React, { ChangeEvent, useState } from 'react'

import { Box, Button, Flex, FormControl, FormLabel, Hide, Input, Text } from '@chakra-ui/react'

import { OrderInputValue } from 'src/types/orderInput'

const INITIAL_VALUE: OrderInputValue = {
  orderId: '',
}

type Props = {
  loading?: boolean
  onSave?: (value: OrderInputValue) => void
  savedValue?: OrderInputValue | null
}

const GetOrderForm = ({ loading, onSave = () => {}, savedValue }: Props) => {
  const [inputValue, setInputValue] = useState<OrderInputValue>(INITIAL_VALUE)
  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = target.value.trimStart()
    setInputValue((prevState) => ({ ...prevState, [target.name]: trimmedValue }))
  }

  const handleSave = () => {
    onSave({
      ...inputValue,
      orderId: inputValue.orderId,
    })

    setInputValue((prevState) => ({ ...prevState, orderId: '' }))
  }
  const disabled = !inputValue.orderId

  return (
    <Box py={12} h="200px">
      <Text>Please enter your order ID here:</Text>
      <FormControl mb={5} isRequired>
        <Input
          id="get-order-input"
          maxW="480px"
          name="orderId"
          onChange={handleInputChange}
          placeholder="order id"
          value={inputValue.orderId}
        />
      </FormControl>
      <Button id="submit-order-id-button" isLoading={loading} isDisabled={disabled} my={5} onClick={handleSave}>
        <Text>Submit</Text>
      </Button>
    </Box>
  )
}

export default GetOrderForm
