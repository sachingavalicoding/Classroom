import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './root/index'
import SigninForm from './auth/forms/SigninForm'
import SignupForm from './auth/forms/SignupForm'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/*  public routes  */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>
          {/* Private route  */}
          {/*  index means index page home page  */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App