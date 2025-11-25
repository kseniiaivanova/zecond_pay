import type { QueryResolvers, MutationResolvers, OrderRelationResolvers } from 'types/graphql'
import { sanitize, isValidEmail, isValidName } from 'src/lib/validation'

import { db } from 'src/lib/db'

export const orders: QueryResolvers['orders'] = () => {
  return db.order.findMany()
}

export const order: QueryResolvers['order'] = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}

export const createOrder: MutationResolvers['createOrder'] = ({ input }) => {
  const safeName = sanitize(input.customerName)
  const safeEmail = sanitize(input.email)

  if (!isValidName(safeName)) {
    throw new Error('Invalid name')
  }

  if (!isValidEmail(safeEmail)) {
    throw new Error('Invalid email')
  }

  if (input.quantity <= 0) {
    throw new Error('Quantity must be at least 1')
  }

  return db.order.create({
    data: {
      ...input,
      customerName: safeName,
      email: safeEmail,
    },
  })
}

export const updateOrder: MutationResolvers['updateOrder'] = ({ id, input }) => {
  return db.order.update({
    data: input,
    where: { id },
  })
}

export const deleteOrder: MutationResolvers['deleteOrder'] = ({ id }) => {
  return db.order.delete({
    where: { id },
  })
}

export const Order: OrderRelationResolvers = {
  payment: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).payment()
  },
}
