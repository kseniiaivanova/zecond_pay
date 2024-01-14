import type { APIGatewayEvent, Context } from 'aws-lambda'
import axios from 'axios'

import { logger } from 'src/lib/logger'


const ZAVER_API_KEY = process.env.ZAVER_API_KEY
const CHECKOUT_URL = process.env.CHECKOUT_URL

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: createOffer function`)

  if (event.httpMethod !== 'POST') {
    return { statusCode: 404 }
  }

  try {
    const requestBody = JSON.parse(event.body || '{}');
    const { amount } = requestBody;

    if (amount === undefined) {
      // If amount is not provided, return a bad request response
      return { statusCode: 400, body: JSON.stringify({ error: 'Amount is required' }) };
    }

    const createPayment = await axios.post(
      CHECKOUT_URL,
      {
        title: 'Test request',
        amount: amount,
        currency: 'SEK',
        market: 'SE',
        lineItems: [
          {
            name: 'The first test item',
            totalAmount: amount,
            unitPrice: amount,
            quantity: 1,
            taxRatePercent: 6.0,
          },
        ],
        merchantUrls: {
          callbackUrl: "https://zaverpay.netlify.app/.netlify/functions/paymentCallback"

        }

      },
      {
        headers: { Authorization: `Bearer ${ZAVER_API_KEY}` },
      }
    )
    console.log('Response from createPayment:', createPayment.data);
    return {
      statusCode: 200,
      body: JSON.stringify(createPayment.data),
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
      },

    }
  } catch (error) {
    return { statusCode: error?.response?.status || 500, body: JSON.stringify(error?.response?.data || 'Unknown error occurred') }
  }
}
