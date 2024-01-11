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

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      id
      orderId
      updatedAt
      zaverPaymentId


    }
  }
`;
