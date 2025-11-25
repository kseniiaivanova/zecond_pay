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
  Stack,
  Text,
  chakra,
} from '@chakra-ui/react'
import CustomButton from '../CustomButton'
import { CustomerFormData } from 'src/types/customerFormData'

type Props = {
  formData: CustomerFormData
  onChange: (field: keyof CustomerFormData, value: string | number) => void
  onConfirm: () => void
}

const ConfirmationStep = ({ formData, onChange, onConfirm }: Props) => {
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange(name as keyof CustomerFormData, value)
  }

  const handleQuantityChange = (valueAsString: string, valueAsNumber: number) => {
    onChange('quantity', valueAsNumber)
  }

  return (
    <Flex direction="column" mt={6} gap={4}>
      <FormControl>
        <FormLabel>Kvantitet</FormLabel>
        <NumberInput name="quantity" value={formData.quantity} min={1} onChange={handleQuantityChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <Text fontSize="md" color="gray.600" mt={4}>
        <chakra.b>Köparens uppgifter</chakra.b>
      </Text>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input id="get-name-input" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input id="get-email-input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <Stack my={4}>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Biljett skickas till denna email.
          </Text>
        </Stack>
      </FormControl>

      <CustomButton
        id="confirm-order-button"
        buttonText="Confirm Order"
        onClick={onConfirm}
        disabled={!formData.name || !isEmailValid || formData.quantity < 1}
      />
    </Flex>
  )
}

export default ConfirmationStep
