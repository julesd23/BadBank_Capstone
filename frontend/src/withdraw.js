import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useContext, useEffect } from 'react'
import { Card } from './context'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTransfers, reset } from './features/transfers/transferSlice'
import { UserContext } from '.'
import WithdrawForm from './components/withdrawForm';

function Withdraw() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isError, message } = useSelector((state) => state.transfers)

  const value = useContext(UserContext);
  const { balance, setBalance } = value

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getTransfers())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  return (
    <Card
      txtcolor="black"
      header={<p>Welcome {user.name} </p>}
      body={
        <div className="inside">
          <section className="heading">
            <h1 className="title" >Make a Withdraw</h1>
            <h2 className="balance">Your current balance is: {balance}</h2>
          </section>
          <WithdrawForm />
        </div>
      }
    />
  )
}

export default Withdraw
