import type { Prisma, Order } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: { data: { status: 'String', amount: 1068471.7903559736, eventId: 'String', eventName: 'String' } },
    two: { data: { status: 'String', amount: 9383774.883421443, eventId: 'String', eventName: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Order, 'order'>
