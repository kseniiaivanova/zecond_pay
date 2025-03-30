import type { APIGatewayEvent, Context } from 'aws-lambda'
import { db } from 'src/lib/db';
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
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: checkPaymentStatus function`)

  try {
    const paymentData = JSON.parse(event.body)

    const zaverPaymentId = paymentData.paymentId
    const payment = await db.payment.findUnique({
      where: { zaverPaymentId },
    })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: payment?.paymentStatus || 'UNKNOWN' }),
  }} catch (error) {
    // Handle any errors that occur during processing
    logger.error('Error processing payment callback:', error);

    // Respond with an error status
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    };
  }
}
