import gql from 'graphql-tag'

export const GET_ORDER = gql`
  query GetOrder($id: String!) {
    order(id: $id) {
      id
      status
      amount
      orderedAt
      paidAt
      eventId
      eventName
      eventDate
      eventLocation
      customerName
      email
      quantity
    }
  }
`
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      status
      amount
      orderedAt
      paidAt
      eventId
      eventName
      eventDate
      eventLocation
      customerName
      email
      quantity
    }
  }
`

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: String!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      status
      amount
      orderedAt
      paidAt
      eventId
      eventName
      payment {
        id
        orderId
        updatedAt
      }
    }
  }
`
