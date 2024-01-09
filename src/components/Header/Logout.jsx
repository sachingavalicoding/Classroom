import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
const Logout = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        // auth service logout for logout from appwrite and after promice get use dispatch to update a store state to false user is not login 

        authService.logout().then(() => dispatch(logout())).catch((error) => {
            console.log(" Logout Handler ERRROR ::: ", error)
        })
    }
    return (
        <button onClick={logoutHandler} className="px-2 py-3 bg-red text-white"> logout </button>
    )
}

export default Logout