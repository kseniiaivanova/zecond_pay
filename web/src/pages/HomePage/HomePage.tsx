import { navigate, routes, useParams } from '@redwoodjs/router'
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    navigate(routes.welcome())
  }, [])

  return null
}

export default HomePage
