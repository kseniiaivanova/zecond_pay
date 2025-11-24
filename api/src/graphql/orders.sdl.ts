export const schema = gql`
  type Order {
    id: String!
    status: String!
    amount: Float!
    orderedAt: DateTime!
    paidAt: DateTime
    eventId: String!
    eventName: String!
    eventDate: String!
    eventLocation: String!
    customerName: String!
    email: String!
    quantity: Int!
    payment: Payment
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: String!): Order @requireAuth
  }

  input CreateOrderInput {
    status: String!
    amount: Float!
    eventId: String!
    eventName: String!
    eventDate: String!
    eventLocation: String!
    customerName: String!
    email: String!
    quantity: Int!
  }

  input UpdateOrderInput {
    status: String
    amount: Float
    paidAt: DateTime
    eventId: String
    eventName: String
    eventDate: String
    eventLocation: String
    customerName: String
    email: String
    quantity: Int
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: String!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: String!): Order! @requireAuth
  }
`
