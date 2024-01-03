import { Flex } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import GetOrderForm from 'src/components/GetOrderForm/GetOrderForm'

const MainPage = () => {
  return (
    <>
      <MetaTags title="Main" description="Main page" />
      <Flex w="100%">
        <GetOrderForm />
      </Flex>
    </>
  )
}

export default MainPage
