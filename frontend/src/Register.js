import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react'
import { Card, UserContext } from './context'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from './features/auth/authSlice'
// import GoogleLogin from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose'

function Register() {


  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET

  const [error, setError] = useState('')
  const [show, setShow] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const { name, email, password, passwordConfirm } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      alert('New account created!')
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

    if (!name) {
      setError('Error: Name required')
      setTimeout(() => setError(''), 3000);
      return false;
    } else if (!email) {
      setError('Error: Email required')
      setTimeout(() => setError(''), 3000);
      return false
    } else if (!password) {
      setError('Error: Password required')
      setTimeout(() => setError(''), 3000);
      return false
    } else if (!passwordConfirm) {
      setError('Please confirm your password')
      setTimeout(() => setError(''), 3000);
      return false
    } else if (password.length < 8) {
      setError('Password must be longer than 8 characters!');
      setTimeout(() => setError(''), 3000);
      return false;
    } else if (password !== passwordConfirm) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  // const responseSuccessGoogle = (response) => {
  //   console.log('SUCCESS', response)
  // }

  // const responseErrorGoogle = (response) => {
  //   console.log('FAILURE', response)
  // }

  const secretKey = process.env.CLIENT_SECRET


  return (
    <Card
      bgcolor="secondary"
      header="Create a new account"
      body={
        <div>
          <h2>Enter your information</h2>

          <section className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder='Enter your name'
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
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
              <div className="form-group">
                <label htmlFor="password">Confirm Password: </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  placeholder='Confirm your password'
                  onChange={onChange}
                />
              </div>
              {error && <><div style={{ color: 'red' }}>{error}</div><br></br></>}
              <div className="flex">
                <button type="submit" className="button2">Submit</button>
                <GoogleLogin

                  onSuccess={async credentialResponse => {

                    // console.log(decodeJwt(credentialResponse.credential))
                    // console.log(credentialResponse)
                    const decodedResponse = decodeJwt(credentialResponse.credential)
                    const userData = {
                      name: decodedResponse.name,
                      email: decodedResponse.email,
                      password: credentialResponse.clientId
                    }
                    dispatch(register(userData))
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>

            </form>
          </section>
        </div>
      }
    />
  )

}

export default Register