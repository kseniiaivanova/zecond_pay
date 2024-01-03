import { navigate, routes, useParams } from '@redwoodjs/router'
import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'
import GetOrderForm from 'src/components/GetOrderForm/GetOrderForm'

const HomePage = () => {
  useEffect(() => {
    navigate(routes.welcome())
  }, [])

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <GetOrderForm />
    </>
  )
}

export default HomePage
