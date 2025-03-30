import type { Meta, StoryObj } from '@storybook/react'

import ThankYouPage from './ThankYouPage'

const meta: Meta<typeof ThankYouPage> = {
  component: ThankYouPage,
}

export default meta

type Story = StoryObj<typeof ThankYouPage>

export const Primary: Story = {}
