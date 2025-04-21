export const schema = gql`
  type Order {
    id: String!
    eventDate: String
    eventLocation: String
    status: String!
    amount: Float!
    paymentId: String
    payment: Payment
    orderedAt: DateTime!
    paidAt: DateTime
    eventId: String!
    eventName: String!
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: String!): Order @requireAuth
  }

  input CreateOrderInput {
    status: String!
    amount: Float!
    paymentId: String
    orderedAt: DateTime!
    paidAt: DateTime
    eventId: String!
    eventName: String!
    eventDate: String
    eventLocation: String
  }

  input UpdateOrderInput {
    status: String
    amount: Float
    paymentId: String
    orderedAt: DateTime
    paidAt: DateTime
    eventId: String
    eventName: String
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: String!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: String!): Order! @requireAuth
  }
`
