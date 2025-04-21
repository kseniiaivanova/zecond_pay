// CustomButton.js
import React from 'react'
import { Button } from '@chakra-ui/react'

const CustomButton = ({ buttonText, onClick, id }) => {
  return (
    <Button
      colorScheme="purple"
      size="md"
      onClick={onClick}
      id={id}
      mx={['auto', 'initial']}
      w="200px"
      textTransform="uppercase"
      fontWeight="bold"
      letterSpacing="widest"
    >
      {buttonText}
    </Button>
  )
}

export default CustomButton
