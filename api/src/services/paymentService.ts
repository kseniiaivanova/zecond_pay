// api/services/paymentService.js
import { db } from 'src/lib/db';

export const transformAndSavePayment = async (paymentData) => {
  // Extract relevant information from paymentData
  const { orderId, updatedAt, zaverPaymentId } = paymentData;

  // Save the transformed data to MongoDB using Prisma
  return db.payment.create({
    data: {
      orderId,
      updatedAt,
      zaverPaymentId



    },
  });
};
