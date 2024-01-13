import React, { ChangeEvent, useState } from 'react'

import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Text, chakra } from '@chakra-ui/react'

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
    <Box
      mt={12}
      h="240px"
      backgroundColor="white"
      borderRadius="md"
      boxShadow="md"
      p={6}
      w={['300px', '400px', '600px']}
    >
      <Text fontSize="xl" mb={4}>
        <chakra.b>Please enter your order ID:</chakra.b>
      </Text>
      <FormControl isRequired>
        <Input
          id="get-order-input"
          name="orderId"
          onChange={handleInputChange}
          placeholder="Order ID"
          value={inputValue.orderId}
          borderColor="blue.300"
          focusBorderColor="blue.500"
        />
      </FormControl>
      <Button
        id="submit-order-id-button"
        colorScheme="blue"
        variant="solid"
        size="md"
        isLoading={loading}
        isDisabled={disabled}
        my={5}
        w="100%"
        alignSelf="center"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="widest"
        onClick={handleSave}
      >
        Submit
      </Button>
    </Box>
  )
}

export default GetOrderForm
