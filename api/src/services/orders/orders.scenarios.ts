import type { Prisma, Order } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: {
      data: {
        status: 'String',
        amount: 89640.08092317899,
        orderedAt: '2023-12-27T20:08:54.657Z',
        payment: { create: { orderId: 'String6332504', updatedAt: '2023-12-27T20:08:54.657Z' } },
      },
    },
    two: {
      data: {
        status: 'String',
        amount: 4227790.582863109,
        orderedAt: '2023-12-27T20:08:54.657Z',
        payment: { create: { orderId: 'String7546159', updatedAt: '2023-12-27T20:08:54.657Z' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Order, 'order'>
