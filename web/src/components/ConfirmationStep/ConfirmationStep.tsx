import React, { ChangeEvent } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  chakra,
} from '@chakra-ui/react'
import CustomButton from '../CustomButton'

interface FormData {
  name: string
  email: string
  quantity: number
}

type Props = {
  formData: FormData
  onChange: (field: keyof FormData, value: string | number) => void
  onConfirm: () => void
}

const ConfirmationStep = ({ formData, onChange, onConfirm }: Props) => {
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(name as keyof FormData, value)
  }

  const handleQuantityChange = (valueAsString: string, valueAsNumber: number) => {
    onChange('quantity', valueAsNumber)
  }

  return (
    <Flex direction="column" mt={6}>
      <NumberInput value={formData.quantity} min={1} onChange={handleQuantityChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="md" color="gray.600">
        <chakra.b>Köparens uppgifter</chakra.b>
      </Text>
      <FormControl mt={4}>
        <FormLabel color="gray.600" fontSize="sm">
          Name
        </FormLabel>
        <Input id="get-name-input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel color="gray.600" fontSize="sm">
          Email
        </FormLabel>
        <Input id="get-email-input" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <FormLabel mt={2} color="gray.600" fontSize="sm">
          Biljett och kvitto skickas till denna email.
        </FormLabel>
      </FormControl>
      <CustomButton
        buttonText="Confirm Order"
        id="confirmation-button"
        onClick={onConfirm}
        disabled={!formData.name || !isEmailValid || formData.quantity < 1}
      />
    </Flex>
  )
}

export default ConfirmationStep
