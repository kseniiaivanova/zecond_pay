import { navigate, routes, useParams } from '@redwoodjs/router'
import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  useEffect(() => {
    navigate(routes.welcome())
  }, [])

  return (
    <>
      <MetaTags title="Home" description="Home page" />
    </>
  )
}

export default HomePage
