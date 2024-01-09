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

// @TODO add zco-token to checkout
const Routes = () => {
  return (
    <Router>
      <Route path="/checkout" page={CheckoutPage} name="checkout" />
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/welcome" page={MainPage} name="welcome" />
        <Route path="/orders/{orderId}" page={OrderPage} name="order" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
