import React, { ChangeEvent, useState } from 'react'

import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text, chakra } from '@chakra-ui/react'

import { useToast } from 'src/components/Toaster'
import CustomButton from 'src/components/CustomButton/CustomButton'

type Props = {
  loading?: boolean
  onSave?: (value: string) => void
  savedValue?: string | null
}

const GetContactForm = ({ loading, onSave = () => {}, savedValue }: Props) => {
  const [inputValue, setInputValue] = useState('')
  const { errorToast } = useToast()

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value.trim())
  }
  return (
    <Flex direction="column">
      <HStack alignItems="flex-end" gap={4} justify="space-between" mt={6}>
        <FormControl>
          <FormLabel color="gray.600" fontSize="sm">
            Enter email to get your ticket
          </FormLabel>
          <Input
            id="get-contact-input"
            name="email"
            onChange={handleInputChange}
            placeholder="Email"
            value={inputValue}
          />
        </FormControl>
        <CustomButton id="get-contact-button" buttonText="Get ticket" onClick={() => onSave(inputValue)} />
      </HStack>
    </Flex>
  )
}
export default GetContactForm
