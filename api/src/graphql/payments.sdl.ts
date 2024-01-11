export const schema = gql`
  type Payment {
    id: String!
    orderId: String!
    updatedAt: DateTime!
    order: Order
    zaverPaymentId: String
    paymentStatus: String!
  }

  type Query {
    payments: [Payment!]! @requireAuth
    payment(id: String!): Payment @requireAuth
  }

  input CreatePaymentInput {
    orderId: String!
    zaverPaymentId: String!
    paymentStatus: String!

  }

  input UpdatePaymentInput {
   paymentStatus:String!
  }

  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment! @requireAuth
    updatePayment(id: String!, input: UpdatePaymentInput!): Payment! @requireAuth
    deletePayment(id: String!): Payment! @requireAuth
  }
`
