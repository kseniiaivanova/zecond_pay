import gql from 'graphql-tag'

export const GET_ORDER= gql`
  query GetOrder($id: String!) {
    getOrder: getOrder(id: $id) {
    id
    status
    amount
    paymentId
    orderedAt
    paidAt
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
      payment {
        id
        orderId
        updatedAt
      }
    }
  }
`
