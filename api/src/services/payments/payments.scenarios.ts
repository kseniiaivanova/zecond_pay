import type { Prisma, Payment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PaymentCreateArgs>({
  payment: {
    one: { data: { orderId: 'String8495811', updatedAt: '2023-12-27T20:09:42.301Z' } },
    two: { data: { orderId: 'String1307133', updatedAt: '2023-12-27T20:09:42.301Z' } },
  },
})

export type StandardScenario = ScenarioData<Payment, 'payment'>
