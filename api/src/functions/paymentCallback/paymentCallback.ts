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
export const handler = async (event: APIGatewayEvent, _context: Context) => {
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

    if (!zaverPaymentId || !paymentStatus) {
      logger.error('Missing paymentId or paymentStatus in callback', paymentData)
      return { statusCode: 400, body: 'Invalid callback payload' }
    }

    // Update payment
    const updatedPayment = await db.payment.update({
      where: { zaverPaymentId },
      data: { paymentStatus },
    })
    logger.info('Updated payment', updatedPayment)

    // Only handle settled payments
    if (paymentStatus === 'SETTLED') {
      const foundPayment = await db.payment.findUnique({
        where: { zaverPaymentId },
      })

      if (!foundPayment) {
        logger.error('No payment found with this zaverPaymentId')
        return { statusCode: 404, body: 'Payment not found' }
      }

      // Update order
      const foundOrder = await db.order.update({
        where: { id: foundPayment.orderId },
        data: { status: 'PAID', paidAt: new Date() },
      })
      logger.info('Order updated', foundOrder)

      // Send email if valid
      const email = foundOrder.email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!email || !emailRegex.test(email)) {
        logger.error('Invalid email address, skipping sendEmail', { email })
      } else {
        try {
          const emailResponse = await fetch('https://hook.eu2.make.com/9ngrpd4apaw0vigz2xqytr6isfsr7ch0', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              orderId: foundOrder.id,
              eventName: foundOrder.eventName,
              eventDate: foundOrder.eventDate,
              amount: foundOrder.amount,
              quantity: foundOrder.quantity || 1,
            }),
          })

          if (!emailResponse.ok) {
            logger.error('SendEmail webhook failed', await emailResponse.text())
          } else {
            logger.info('SendEmail webhook succeeded')
          }
        } catch (e) {
          logger.error('Error sending email', e)
        }
      }
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
