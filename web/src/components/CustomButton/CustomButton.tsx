// CustomButton.js
import React from 'react'
import { Button } from '@chakra-ui/react'

const CustomButton = ({ buttonText, onClick, id }) => {
  return (
    <Button colorScheme="blue" size="md" onClick={onClick} id={id} mt={4} mb={4} w="200px">
      {buttonText}
    </Button>
  )
}

export default CustomButton
