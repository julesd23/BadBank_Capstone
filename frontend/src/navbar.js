import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from './features/auth/authSlice'


function NavBar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if(!user) {
  //     navigate('/login')
  //   }
  // }, [user, navigate])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  return (
    <Navbar collapseOnSelect expand="lg" className="react-nav" fixed="right" >
      <a className="navbar-brand" href="/">BadBank</a>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="navbar-nav">

          {user ? (
            <>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="3" as={Link} to="/deposit/">Deposit</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="4" as={Link} to="/withdraw/">Withdraw</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="5" as={Link} to="/balance/">Balance</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="6" as={Link} to="/alldata/">AllData</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" onClick={onLogout}>
                <Nav.Link eventKey="7" as={Link} to="/">Logout
                  <FaSignOutAlt />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="user-nav">
                <Nav.Link eventKey="8" as={Link} to="/">{user.email}</Nav.Link>
              </Nav.Item>
            </>
          ) : (<>
            <Nav.Item className="nav-item">
              <Nav.Link eventKey="1" as={Link} to="/CreateAccount/">Create Account
                <FaUser />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <Nav.Link eventKey="2" as={Link} to="/login/">Login
                <FaSignInAlt />
              </Nav.Link>
            </Nav.Item>
          </>)}
        </Nav>
      </Navbar.Collapse>

    </Navbar>

  );
}

export default NavBar