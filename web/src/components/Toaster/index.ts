import { useToast as useToastUI } from '@chakra-ui/react'

export const useToast = () => {
  const toast = useToastUI()

  const errorToast = (message: string) =>
    toast({
      description: message,
      duration: 5000,
      isClosable: true,
      position: 'top',
      status: 'error',
    })

  return { errorToast }
}
