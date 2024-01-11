import type { QueryResolvers, MutationResolvers, PaymentRelationResolvers } from 'types/graphql'


import { db } from 'src/lib/db'


export const payments: QueryResolvers['payments'] = () => {
  return db.payment.findMany()
}

export const payment: QueryResolvers['payment'] = ({ id }) => {
  return db.payment.findUnique({
    where: { id },
  })
}

export const createPayment: MutationResolvers['createPayment'] = async ({ input }) => {
  const payment = await db.payment.create({
    data: input,
  })

  const updatedOrder = await db.order.update({
    data: { paymentId: payment.id },
    where: { id: payment.orderId },
  });


  return payment
}

export const updatePayment: MutationResolvers['updatePayment'] = ({ id, input }) => {
  return db.payment.update({
    data: input,
    where: { id },
  })
}

export const deletePayment: MutationResolvers['deletePayment'] = ({ id }) => {
  return db.payment.delete({
    where: { id },
  })
}

/* export const Payment: PaymentRelationResolvers = {
  order: (_obj, { root }) => {
    return db.payment.findUnique({ where: { id: root?.id } }).order()
  },
}
 */
