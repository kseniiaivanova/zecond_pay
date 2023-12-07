import { render } from '@redwoodjs/testing/web'

import OrderInput from './GetOrderForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrderInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrderInput />)
    }).not.toThrow()
  })
})
