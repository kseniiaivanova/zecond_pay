import type { Meta, StoryObj } from '@storybook/react'

import CheckoutPage from './CheckoutPage'

const meta: Meta<typeof CheckoutPage> = {
  component: CheckoutPage,
}

export default meta

type Story = StoryObj<typeof CheckoutPage>

export const Primary: Story = {}
