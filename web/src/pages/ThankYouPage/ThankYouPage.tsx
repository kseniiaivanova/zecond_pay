import { useQuery } from '@apollo/client'
import { Box, Flex, Heading, Stack, Text, Icon } from '@chakra-ui/react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { GET_ORDER } from 'src/apollo/orders'
import CustomButton from 'src/components/CustomButton/CustomButton'
import PageLoading from 'src/components/PageLoading/PageLoading'
import { useToast } from 'src/components/Toaster'
import { Order } from 'src/types/order'

const ThankYouPage = () => {
  const { orderId } = useParams()
  const { errorToast } = useToast()

  const { data, loading } = useQuery<{ order: Order }>(GET_ORDER, {
    variables: { id: orderId },
    onError: () => {
      errorToast('Kunde inte hämta orderinformation.')
    },
  })

  const order = data?.order

  const handleGoBack = () => {
    navigate(routes.welcome())
  }

  return (
    <>
      <MetaTags title="Tack" description="Tack för din beställning" />

      <Flex direction="column" align="center" justify="center" px={4} py={10} minH="100vh">
        {loading && <PageLoading />}

        {!loading && (
          <Box textAlign="center" maxW="500px">
            <Icon boxSize={20} color="green.400">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9.00039 16.2002L4.80039 12.0002L3.40039 13.4002L9.00039 19.0002L21.0004 7.0002L19.6004 5.6002L9.00039 16.2002Z"
                />
              </svg>
            </Icon>

            <Heading as="h1" size="lg" mb={4}>
              Tack för din beställning!
            </Heading>
            <Text fontSize="md" color="gray.700" mb={4}>
              Din biljett har skickats till {order?.email}.
            </Text>
            <CustomButton id="navigation-button" buttonText="Till startsidan" onClick={handleGoBack} />
          </Box>
        )}
      </Flex>
    </>
  )
}

export default ThankYouPage
