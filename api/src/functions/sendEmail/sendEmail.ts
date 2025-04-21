import type { APIGatewayEvent, Context } from 'aws-lambda'

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
  logger.info(`${event.httpMethod} ${event.path}: sendEmail function`)

  try {
    const { email, orderId, eventName, eventDate, amount } = JSON.parse(event.body || '{}')

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid email address' }),
      }
    }

    // Send to Make webhook
    const response = await fetch('https://hook.eu2.make.com/9ngrpd4apaw0vigz2xqytr6isfsr7ch0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, orderId, eventName, eventDate, amount }),
    })

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    }


  } catch (error: any) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      }
    }
  }

