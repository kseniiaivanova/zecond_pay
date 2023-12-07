import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import GetOrderForm from 'src/components/GetOrderForm/GetOrderForm'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <GetOrderForm />
    </>
  )
}

export default HomePage
