import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react'
import { Card, UserContext } from './context'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from './features/auth/authSlice'
import { GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose'

function Login() {

  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
      setError("Invalid credentials")
      setTimeout(() => setError(''), 1500)
    }
    if (isSuccess) {
      alert("You are now logged in")
      navigate('/')
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login to your account"
      body={
        <>
          <div className='form-inner'>
            <div className="card-header">
              <h2>Login</h2>
            </div>

            <section className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder='Enter your email'
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder='Password'
                    onChange={onChange}
                  />
                </div>

                <div className="flex">
                  <button type="submit" className="button2">Submit</button>
                  <GoogleLogin
                    onSuccess={async credentialResponse => {
                      // console.log(decodeJwt(credentialResponse.credential))
                      // console.log(credentialResponse)
                      const decodedResponse = decodeJwt(credentialResponse.credential)
                      const userData = {
                        email: decodedResponse.email,
                        password: credentialResponse.clientId
                      }
                      dispatch(login(userData))
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    />
                </div>

                    {error && <><br></br><div style={{ color: 'red' }}>{error}</div></>}
              </form>
            </section>
          </div>
        </>
      }
    />
  )
}

export default Login