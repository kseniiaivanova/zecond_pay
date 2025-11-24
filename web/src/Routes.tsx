// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import HomePage from './pages/HomePage/HomePage'
import MainPage from './pages/MainPage/MainPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import OrderPage from './pages/OrderPage/OrderPage'
import ThankYouPage from './pages/ThankYouPage/ThankYouPage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/welcome" page={MainPage} name="welcome" />
        <Route path="/orders/{eventId}" page={OrderPage} name="order" />
        <Route path="/thank-you/{orderId}" page={ThankYouPage} name="thankYou" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
