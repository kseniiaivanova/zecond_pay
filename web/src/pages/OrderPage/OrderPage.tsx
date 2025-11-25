import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Flex,
  Text,
  Heading,
  VStack,
  Box,
  Divider,
  Badge,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from '@chakra-ui/react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { CREATE_ORDER } from 'src/apollo/orders'
import { CREATE_PAYMENT } from 'src/apollo/payments'
import CustomButton from 'src/components/CustomButton/CustomButton'
import { useToast } from 'src/components/Toaster'
import { events } from 'src/data/events'
import ConfirmationStep from 'src/components/ConfirmationStep/ConfirmationStep'
import { CustomerFormData } from 'src/types/customerFormData'
import { PaymentData } from 'src/types/paymentData'

const OrderPage = () => {
  const { eventId } = useParams()
  const { errorToast } = useToast()

  const [createdOrderId, setCreatedOrderId] = useState<string>('')
  const [isOrderCreated, setIsOrderCreated] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isPaymentSettled, setIsPaymentSettled] = useState(false)
  const [showBackModal, setShowBackModal] = useState(false)
  const [ongoingPayment, setOngoingPayment] = useState(false)

  const [formData, setFormData] = useState<CustomerFormData>({
    quantity: 1,
    name: '',
    email: '',
  })

  const event = events.find((e) => e.id === eventId)

  if (!event) {
    errorToast('Event not found')
    navigate(routes.welcome())
    return null
  }

  const totalAmount = event.price * formData.quantity

  const [createOrder] = useMutation(CREATE_ORDER, {
    onError: () => errorToast('Failed to create order'),
    onCompleted: (data) => {
      setCreatedOrderId(data.createOrder.id)
      setIsOrderCreated(true)
    },
  })

  const [createPayment] = useMutation(CREATE_PAYMENT, {
    onError: () => errorToast('Failed to create payment'),
  })

  const handleFormChange = (field: keyof CustomerFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleConfirmOrder = async () => {
    try {
      await createOrder({
        variables: {
          input: {
            status: 'CREATED',
            amount: totalAmount,
            eventId: event.id,
            eventName: event.title,
            eventLocation: event.location,
            eventDate: event.date,
            customerName: formData.name,
            email: formData.email,
            quantity: formData.quantity,
          },
        },
      })
    } catch (error) {
      errorToast('Could not create order. Please try again.')
    }
  }

  const handlePayment = async () => {
    if (ongoingPayment) return
    setOngoingPayment(true)

    if (!createdOrderId) {
      errorToast('Order not found. Confirm order first.')
      return
    }

    try {
      const response = await fetch('/.netlify/functions/createPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          eventName: event.title,
          quantity: formData.quantity,
        }),
      })

      if (response.ok) {
        const data = await response.json()

        setPaymentData({
          token: data.token,
          paymentId: data.paymentId,
          status: data.paymentStatus,
        })

        const paymentInput = {
          input: {
            orderId: createdOrderId,
            zaverPaymentId: data.paymentId,
            paymentStatus: data.paymentStatus,
          },
        }

        createPayment({ variables: paymentInput })
      }
    } catch (error) {
      console.error('Payment error:', error)
      errorToast('Failed to create payment')
    } finally {
      setOngoingPayment(false)
    }
  }

  const handleGoBack = () => {
    navigate(routes.welcome())
  }

  const handleCancelPayment = () => {
    setShowBackModal(true)
  }

  useEffect(() => {
    if (!paymentData?.token) return

    const existingScript = document.getElementById('zco-loader')
    if (existingScript) {
      existingScript.setAttribute('zco-token', paymentData.token)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://iframe-checkout.test.zaver.com/loader/loader-v1.js'
    script.id = 'zco-loader'
    document.body.appendChild(script)

    script.onload = () => {
      setTimeout(() => {
        script.setAttribute('zco-token', paymentData.token)
      }, 100)
    }
  }, [paymentData?.token])

  useEffect(() => {
    if (!paymentData?.paymentId || !createdOrderId) return

    const interval = setInterval(async () => {
      const response = await fetch('/.netlify/functions/checkPaymentStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: paymentData.paymentId }),
      })

      const result = await response.json()

      if (result.status === 'SETTLED') {
        clearInterval(interval)
        setIsPaymentSettled(true)
        navigate(routes.thankYou({ orderId: createdOrderId }))
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [paymentData?.paymentId, createdOrderId])

  const confirmGoBack = () => {
    setShowBackModal(false)
    navigate(routes.welcome())
  }

  return (
    <>
      <MetaTags title="Order" description="Order summary" />
      <Flex
        direction="column"
        minH="100vh"
        align="center"
        px={4}
        py={10}
        bgGradient="linear(to-br, blue.50, purple.50)"
      >
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Orderbekräftelse
        </Heading>

        <Flex
          bg="white"
          direction="column"
          p={8}
          borderRadius="2xl"
          boxShadow="2xl"
          w="full"
          maxW="2xl"
          border="1px"
          borderColor="gray.200"
        >
          <Box bgGradient="linear(to-r, blue.500, purple.600)" p={6} borderRadius="xl" mb={6} color="white">
            <Heading as="h2" size="lg" mb={4}>
              {event.title}
            </Heading>
            <VStack align="stretch" spacing={3}>
              <HStack spacing={3}>
                <Text fontWeight="bold">Location</Text>
                <Text>{event.location}</Text>
              </HStack>
              <HStack spacing={3}>
                <Text fontWeight="bold">Date</Text>
                <Text>{event.date}</Text>
              </HStack>
            </VStack>
          </Box>
          <Divider mb={6} />
          <VStack spacing={4} align="stretch" mb={6}>
            <Flex justify="space-between" align="center">
              <Text>Pris per biljett</Text>
              <Text fontWeight="semibold">{event.price} SEK</Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text>Antal biljetter</Text>
              <Badge colorScheme="purple" px={3} py={1}>
                {formData.quantity}
              </Badge>
            </Flex>
            <Divider />
            <Flex justify="space-between" align="center" py={2}>
              <Text fontWeight="bold">Totalt att betala</Text>
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                {totalAmount} SEK
              </Text>
            </Flex>
          </VStack>
          <Divider mb={8} />
          {!isOrderCreated && (
            <ConfirmationStep formData={formData} onChange={handleFormChange} onConfirm={handleConfirmOrder} />
          )}

          {isOrderCreated && !isPaymentSettled && (
            <Box bg="green.50" p={6} borderRadius="xl" border="2px" borderColor="green.200" textAlign="center">
              {!paymentData ? (
                <>
                  <Text fontSize="xl" fontWeight="bold" mb={2}>
                    Order bekräftad
                  </Text>
                  <Text fontSize="sm" mb={4}>
                    Order ID: {createdOrderId}
                  </Text>
                  <Text fontSize="sm">Fortsätt till betalning för att slutföra ditt köp</Text>
                </>
              ) : (
                <>
                  <Text fontSize="xl" fontWeight="bold" mb={2}>
                    Betalning genomförs
                  </Text>
                  <Text fontSize="sm" mb={4}>
                    Order ID: {createdOrderId}
                  </Text>
                  <Text fontSize="sm">Stäng inte fönstret för att slutföra betalningen</Text>
                </>
              )}
            </Box>
          )}

          <Box id="zco-container" mt={6} />
        </Flex>
        <VStack spacing={4} mt={8} w="full" maxW="md">
          {isOrderCreated && !paymentData && (
            <CustomButton
              id="create-payment-button"
              buttonText="Betala nu"
              onClick={handlePayment}
              disabled={ongoingPayment}
            />
          )}
          {paymentData?.token && !isPaymentSettled && (
            <CustomButton id="cancel-payment-button" buttonText="Avbryt betalning" onClick={handleCancelPayment} />
          )}
          id="navigation-button"
          {ongoingPayment && <CustomButton buttonText="Tillbaka" onClick={handleGoBack} />}
        </VStack>
      </Flex>
      <Modal isOpen={showBackModal} onClose={() => setShowBackModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avbryt betalning?</ModalHeader>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setShowBackModal(false)}>
              Nej
            </Button>
            <Button colorScheme="red" onClick={confirmGoBack} ml={3}>
              Ja, gå tillbaka
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrderPage
