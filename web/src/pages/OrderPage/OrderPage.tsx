import { Flex, Text, Stack, Button, useMediaQuery } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const OrderPage = () => {
  const [smallScreen] = useMediaQuery('(max-width: 767px)')


  
  return (
    <>
      <MetaTags title="Order" description="Order page" />

      <h1>OrderPage</h1>
      <p>
        Find me in <code>./web/src/pages/OrderPage/OrderPage.tsx</code>
      </p>
      <p>
        My default route is named <code>order</code>, link to me with `<Link to={routes.order()}>Order</Link>`
      </p>
    </>
  )
}

export default OrderPage
