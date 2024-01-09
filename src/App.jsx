import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Footer, Navbar } from "./components/index";
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice";

const App = () => {
  // need loading state for conditional redering to use for fetch data before on appwrite 
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // get an current user 
    // user data it fetch then store into payload or store using dispatch
    // user can't have an data then logout him and say to re login 
    authService.getCurrentUser().
      then((userData) => {
        if (userData) {

          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      }).
      // after fetch data change state of loading true to false 
      finally(() => setIsLoading(false))
  }, [])
  return (
    <>
      <Navbar />
      <main>
        {
          isLoading ? (<h1> Loading </h1>) : (<h1> Not Loading </h1>)
        }
        {/*  bulid next time */}
        {/* <Outlet />  */}
      </main>
      <Footer />
    </>
  )
}

export default App