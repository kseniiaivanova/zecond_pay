import type { QueryResolvers, MutationResolvers, OrderRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const listOrders: QueryResolvers['listOrders'] = () => {
  return db.order.findMany()
}

export const getOrder: QueryResolvers['getOrder'] = async ({ id }) => {
  const order = await db.order.findUnique({
    where: { id },
  })
  return order
}

export const createOrder: MutationResolvers['createOrder'] = async ({ input }) => {
  return await db.order.create({
    data: input,
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
