import React, { ChangeEvent, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Hide,
  Input,
  Text,
} from '@chakra-ui/react'

const GetOrderForm = () => {
  return (
    <div>
      <Box>
        <Text>Please enter your order ID here:</Text>
        <FormControl mb={5} isRequired>
          <Input
            id="get-order-input"
            maxW="480px"
            name="id"
            // onChange={handleInputChange}
            placeholder="order id"
            //value={order_id}
          />
        </FormControl>
      </Box>
    </div>
  )
}

export default GetOrderForm
