import { Box } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CheckoutPage = () => {
  return (
    <>
      <MetaTags title="Checkout" description="Checkout page" />

      <h1>CheckoutPage</h1>
      <Box id="zco-container" w={300} h={300}>
        <script
          src="https://iframe-checkout.test.zaver.com/loader/loader-v1.js"
          id="zco-loader"
          zco-token="emNvdG9rOGRhNTU0ZWMtMmVhMi00MjZmLTg4ZDUtOWUzYzA5NzU3Zjli"
        ></script>
      </Box>
      <p>
        My default route is named <code>checkout</code>, link to me with `<Link to={routes.checkout()}>Checkout</Link>`
      </p>
    </>
  )
}

export default CheckoutPage
