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


  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const {name, email, password, passwordConfirm} = formData
  //   const options = {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
  //     body: JSON.stringify(formData),
  //     mode: 'no-cors'
  //   }
  //   const url = `http://localhost:4000/api/users/`;
  //   (async () => {
  //     var res = await fetch(url, options);
  //     var data = await res.json();
  //     console.log(data);
  //   })();
  // }

  // const handleChange = (id, e) => {
  //   setFormData({
  //     ...formData,
  //     [id]: e.target.value
  //   })
  // }

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
    <>
      <section className="card-header">
        <h1>
          <FaUser /> Create Account
        </h1>
        <p>Please create an account</p>
      </section>

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
          <div className="form-group">
            <button type="submit" className="btn btn-dark">Submit</button>
          </div>
          {/* <GoogleLogin
            clientId="810852788214-a5mjmk908heu421jco4us44f3g90vllv.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          /> */}

          <GoogleLogin
            onSuccess={ async credentialResponse => {

              console.log(decodeJwt(credentialResponse.credential))
              console.log(credentialResponse)
              const decodedResponse = decodeJwt(credentialResponse.credential)
              // console.log(credentialResponse);
              // const jwt = credentialResponse.credential
              // const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secretKey, {
              //   issuer: 'urn:example:issuer',
              //   audience: 'urn:example:audience',
              // })
              
              // console.log(protectedHeader)
              // console.log(payload)
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
        </form>
      </section>
    </>
  )

  //   const [show, setShow]     = useState(true);
  //   const [status, setStatus] = useState('');

  //   return (
  //     <Card
  //       bgcolor="primary"
  //       header="Create Account"
  //       status={status}
  //       body={show ? 
  //         <CreateForm setShow={setShow}/> : 
  //         <CreateMsg setShow={setShow}/>}
  //     />
  //   )
  // }

  // function CreateMsg(props){
  //   return(<>
  //     <h5>Success</h5>
  //     <button type="submit" 
  //       className="btn btn-light" 
  //       onClick={() => props.setShow(true)}>Add another account</button>
  //   </>);
  // }

  // function CreateForm(props){
  //   const [name, setName]         = useState('');
  //   const [email, setEmail]       = useState('');
  //   const [password, setPassword] = useState('');
  //   // const [balance, setBalance] = React.useState(0);
  //   // const ctx = React.useContext(UserContext);  

  //   // LOCAL handle()
  //   // function handle(){
  //   //   console.log(name,email,password);
  //   //   ctx.users.push({name,email, password});
  //   //   props.setShow(false);
  //   // }

  //   function handle(){
  //     console.log(name,email,password);
  //     const url = `/account/create/${name}/${email}/${password}`;
  //     (async () => {
  //       var res = await fetch(url);
  //       var data = await res.json();
  //       console.log(data);
  //     })();
  //     props.setShow(false);
  //   }

  //   return (<>

  //     Name<br/>
  //     <input type="input" 
  //       className="form-control" 
  //       placeholder="Enter name" 
  //       value={name} 
  //       onChange={e => setName(e.currentTarget.value)} /><br/>

  //     Email address<br/>
  //     <input type="input" 
  //       className="form-control" 
  //       placeholder="Enter email" 
  //       value={email} 
  //       onChange={e => setEmail(e.currentTarget.value)}/><br/>

  //     Password<br/>
  //     <input type="password" 
  //       className="form-control" 
  //       placeholder="Enter password" 
  //       value={password} 
  //       onChange={e => setPassword(e.currentTarget.value)}/><br/>

  //     <button type="submit" 
  //       className="btn btn-light" 
  //       onClick={handle}>Create Account</button>

  //   </>);
}

export default Register