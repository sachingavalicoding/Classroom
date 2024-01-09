import { Container, Logout, Logo } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
    const navItems = [
        {
            name: "Home",
            path: "/",
            active: true,
        },
        {
            name: "Login",
            path: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            path: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            path: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add post",
            path: "/add-post",
            active: authStatus,
        },

    ]
    // get an state of an user login or not from store 
    const authStatus = useSelector((state) => state.auth.status)
    return (
        <header className='w-full'>
            <Container>
                <nav>
                    <div>
                        <Link to={"/"}>
                            <Logo />
                        </Link>
                    </div>
                    <ul>
                        {
                            navItems.map((item) => {
                                return item.active ? (
                                    <li onClick={() => navigate(item.path)} key={item.name}>
                                        {item.name}
                                    </li>
                                ) : null
                            })
                        }
                        {
                            authStatus && (
                                <li>
                                    <Logout />
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Navbar