import type { APIGatewayEvent, Context } from 'aws-lambda';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';


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
  logger.info(`${event.httpMethod} ${event.path}: paymentCallback function`);

  try {
    const paymentData = JSON.parse(event.body);
    console.log(paymentData);

    // Extract relevant information from paymentData
    const zaverPaymentId = paymentData.paymentId;
    const paymentStatus = paymentData.paymentStatus;


    // Update payment status
    if (paymentStatus === 'SETTLED') {
      await db.payment.update({
        where: { zaverPaymentId: zaverPaymentId },
        data: { paymentStatus: paymentStatus },
      });

      const foundPayment = await db.payment.findUnique({
        where: { zaverPaymentId },
      });

        await db.order.update({
        where: { paymentId:foundPayment.id },
        data: {status: 'PAID'}
      })

      console.log('Payment status updated');
    }

    // Respond with a success status
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Payment callback processed successfully',
      }),
    };
  } catch (error) {
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
};
