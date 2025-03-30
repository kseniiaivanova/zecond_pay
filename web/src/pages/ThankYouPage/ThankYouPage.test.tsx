import { render } from '@redwoodjs/testing/web'

import ThankYouPage from './ThankYouPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ThankYouPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThankYouPage />)
    }).not.toThrow()
  })
})
