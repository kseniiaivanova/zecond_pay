// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import OrderInput from './GetOrderForm'

const meta: Meta<typeof OrderInput> = {
  component: OrderInput,
}

export default meta

type Story = StoryObj<typeof OrderInput>

export const Primary: Story = {}
