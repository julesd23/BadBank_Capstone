// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react'
// import {Card, UserContext} from './context'

// function Login(){
//   const [show, setShow]     = React.useState(true);
//   const [status, setStatus] = React.useState('');    

//   return (
//     <Card
//       bgcolor="secondary"
//       header="Login"
//       status={status}
//       body={show ? 
//         <LoginForm setShow={setShow} setStatus={setStatus}/> :
//         <LoginMsg setShow={setShow} setStatus={setStatus}/>}
//     />
//   ) 
// }

// function LoginMsg(props){
//   return(<>
//     <h5>Success</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => props.setShow(true)}>
//         Authenticate again
//     </button>
//   </>);
// }

// function LoginForm(props){
//   const [email, setEmail]       = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const ctx = React.useContext(UserContext);  

//   // function handle(){
//   //   const user = ctx.users.find((user) => user.email == email);
//   //   console.log(user);
//   //   console.log(email, password);
//   //   if (!user) {
//   //     console.log('one')      
//   //     props.setStatus('fail!')      
//   //     return;      
//   //   }
//   //   if (user.password == password) {
//   //     console.log('two')            
//   //     props.setStatus('');
//   //     props.setShow(false);
//   //     return;      
//   //   }
//   //   console.log('three')          
//   //   props.setStatus('fail!');        
//   // }

//   function handle(props){
//     console.log(email,password);
//     const url = `/account/login/${email}/${password}`;
//     fetch(`/account/login/${email}/${password}`)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//       })
//     // props.setShow(false);
//   }

//   return (<>

//     Email<br/>
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

//     <button type="submit" className="btn btn-light" onClick={handle}>Login</button>

//   </>);
// }

// export default Login


// New code with API


import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react'
import { Card, UserContext } from './context'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from './features/auth/authSlice'

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
    
    // if (isError) {
    //   setError("Invalid credentials")
    //   setTimeout(() => setError(''), 1500)
    // } else {
    //   alert("You are now logged in")
    // }
  }

  return (
    <>
      <section className="card-header">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Enter your credentials</p>
      </section>

      <section className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
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
                      {error && <><div style={{ color: 'red' }}>{error}</div></>}
            <button type="submit" className="btn btn-dark">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login