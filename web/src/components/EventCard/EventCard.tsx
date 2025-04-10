import { Box, Heading, Image, ListItem, UnorderedList, Text, Stack, HStack, Flex } from '@chakra-ui/react'
import { events } from 'src/data/events'
import CustomButton from 'src/components/CustomButton'

import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const Event = ({ handleCreateOrder }) => {
  return (
    <Box>
      <Heading as="h1" size="xl" mt={[12, 8, 8]} textAlign="center">
        Upcoming Events
      </Heading>
      <Flex direction="column" w="full" alignItems="center" px={4} py={8}>
        <UnorderedList spacing={6} styleType="none" ml={0}>
          {events.map((event) => (
            <ListItem key={event.id} bg="gray.50" p={6} borderRadius="xl" boxShadow="md">
              <Flex gap={6} direction={['column', 'row', 'row']}>
                <Image src={event.image} alt={event.title} borderRadius="lg" maxW="400px" w="full" />
                <Stack spacing={2} ml={[0, 6, 6]}>
                  <Text fontSize="xl" fontWeight="bold">
                    {event.title}
                  </Text>
                  <HStack>
                    <FaCalendarAlt />
                    <Text fontSize="md">{event.date}</Text>
                  </HStack>
                  <HStack>
                    <FaMapMarkerAlt />
                    <Text fontSize="md">{event.location}</Text>
                  </HStack>

                  <Text>{event.description}</Text>
                  <Text fontWeight="bold">Price: {event.price} SEK</Text>
                  <CustomButton id="payment_button" buttonText="Buy Ticket" onClick={() => handleCreateOrder(event)} />
                </Stack>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
    </Box>
  )
}

export default Event
