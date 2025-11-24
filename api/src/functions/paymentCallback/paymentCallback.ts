import type { APIGatewayEvent, Context } from 'aws-lambda'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object that contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, _context) => {
  logger.info('paymentCallback triggered')

  try {
    if (!event.body) {
      logger.error('Callback has no body')
      return { statusCode: 400, body: 'Missing body' }
    }

    const paymentData = JSON.parse(event.body)
    logger.info('Incoming callback data', paymentData)

    const zaverPaymentId = paymentData.paymentId
    const paymentStatus = paymentData.paymentStatus

    logger.info('zaverPaymentId:', zaverPaymentId)
    logger.info('paymentStatus:', paymentStatus)

    if (paymentStatus === 'SETTLED') {
      logger.info('Updating payment status now')

      const updatedPayment = await db.payment.update({
        where: { zaverPaymentId },
        data: { paymentStatus },
      })

      logger.info('Updated payment record', updatedPayment)

      const foundPayment = await db.payment.findUnique({
        where: { zaverPaymentId },
      })

      logger.info('Found payment after update', foundPayment)

      if (!foundPayment) {
        logger.error('No payment found with this zaverPaymentId')
        return { statusCode: 404, body: 'Payment not found' }
      }

      logger.info('Order ID from payment:', foundPayment.orderId)

      const updatedOrder = await db.order.update({
        where: { id: foundPayment.orderId },
        data: { status: 'PAID', paidAt: new Date() },
      })

      logger.info('Order updated', updatedOrder)
      console.log('Order updated', updatedOrder)
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Payment callback processed' }),
    }
  } catch (error) {
    logger.error('Callback error', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}
