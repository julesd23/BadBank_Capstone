import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from './features/auth/authSlice'

function NavBar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  return (
    <Navbar collapseOnSelect expand="md" className="navbar navbar-collapse navbar-dark bg-dark" fixed="right" >
      <a className="navbar-brand" href="/">BadBank</a>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="navbar-nav">

          {user ? (
            <>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="3" as={Link} to="/deposit/" data-tooltip="Make a deposit">Deposit</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="4" as={Link} to="/withdraw/" data-tooltip="Withdraw funds">Withdraw</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="5" as={Link} to="/balance/" data-tooltip="Check your current balance" >Balance</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item">
                <Nav.Link eventKey="6" as={Link} to="/alldata/" data-tooltip="View all transactions" >AllData</Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" onClick={onLogout}>
                <Nav.Link eventKey="7" as={Link} to="/" data-tooltip="Logout of your account">Logout
                  <FaSignOutAlt />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="user-nav">
                <Nav.Link eventKey="8" as={Link} to="/" data-tooltip="Current user">{user.email}</Nav.Link>
              </Nav.Item>
            </>
          ) : (<>
            <Nav.Item className="nav-item">
              <Nav.Link eventKey="1" as={Link} to="/CreateAccount/" data-tooltip="Make a new account">Create Account
                <FaUser />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
              <Nav.Link eventKey="2" as={Link} to="/login/" data-tooltip="Login to your account">Login
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