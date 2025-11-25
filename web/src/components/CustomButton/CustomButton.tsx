import React from 'react'
import { Button } from '@chakra-ui/react'

interface CustomButtonProps {
  buttonText: string
  onClick: () => void
  disabled?: boolean
  id?: string
}

const CustomButton = ({ buttonText, onClick, id, disabled }: CustomButtonProps) => {
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
      isDisabled={disabled}
    >
      {buttonText}
    </Button>
  )
}

export default CustomButton
