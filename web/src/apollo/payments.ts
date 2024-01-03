import gql from 'graphql-tag'

export const GET_PAYMENT= gql`
  query GetPayment($id: String!) {
    payment: payment(id: $id) {
      id
      orderId
      updatedAt
  }
}
`
