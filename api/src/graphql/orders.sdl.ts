export const schema = gql`
  type Order {
    id: String!
    status: String!
    amount: Float!
    paymentId: String!
    payment: Payment!
    orderedAt: DateTime!
    paidAt: DateTime
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: String!): Order @requireAuth
  }

  input CreateOrderInput {
    status: String!
    amount: Float!
    paymentId: String!
    orderedAt: DateTime!
    paidAt: DateTime
  }

  input UpdateOrderInput {
    status: String
    amount: Float
    paymentId: String
    orderedAt: DateTime
    paidAt: DateTime
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: String!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: String!): Order! @requireAuth
  }
`
