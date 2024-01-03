import type { Payment } from '@prisma/client'

import { payments, payment, createPayment, updatePayment, deletePayment } from './payments'
import type { StandardScenario } from './payments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('payments', () => {
  scenario('returns all payments', async (scenario: StandardScenario) => {
    const result = await payments()

    expect(result.length).toEqual(Object.keys(scenario.payment).length)
  })

  scenario('returns a single payment', async (scenario: StandardScenario) => {
    const result = await payment({ id: scenario.payment.one.id })

    expect(result).toEqual(scenario.payment.one)
  })

  scenario('creates a payment', async () => {
    const result = await createPayment({
      input: { orderId: 'String1778266', updatedAt: '2023-12-27T20:09:42.242Z' },
    })

    expect(result.orderId).toEqual('String1778266')
    expect(result.updatedAt).toEqual(new Date('2023-12-27T20:09:42.242Z'))
  })

  scenario('updates a payment', async (scenario: StandardScenario) => {
    const original = (await payment({ id: scenario.payment.one.id })) as Payment
    const result = await updatePayment({
      id: original.id,
      input: { orderId: 'String98020862' },
    })

    expect(result.orderId).toEqual('String98020862')
  })

  scenario('deletes a payment', async (scenario: StandardScenario) => {
    const original = (await deletePayment({ id: scenario.payment.one.id })) as Payment
    const result = await payment({ id: original.id })

    expect(result).toEqual(null)
  })
})
