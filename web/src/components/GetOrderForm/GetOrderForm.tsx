import React, { ChangeEvent, useState } from 'react'

import { Box, Button, FormControl, Input, Text, chakra } from '@chakra-ui/react'

import { OrderInputValue } from 'src/types/orderInput'
import { useToast } from 'src/components/Toaster'

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
  const { errorToast } = useToast()
  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = target.value.trim()
    setInputValue((prevState) => ({ ...prevState, [target.name]: trimmedValue }))
  }

  const handleSave = () => {
    const idPattern = /^[0-9a-f]{24}$/

    // Function to validate the ID
    function validateId(id) {
      return idPattern.test(id)
    }

    if (validateId(inputValue.orderId)) {
      onSave({
        ...inputValue,
        orderId: inputValue.orderId,
      })

      setInputValue((prevState) => ({ ...prevState, orderId: '' }))
    } else {
      errorToast('ID not valid!')
    }
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
