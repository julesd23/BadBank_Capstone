import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useContext, useEffect, useState, useMemo } from 'react'
import { Card } from './context'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { newTransfer, getTransfers, reset } from './features/transfers/transferSlice'
import initialState from './features/transfers/transferSlice'
import DepositForm from './components/depositForm'
import TransferItem from './components/transferItem'

import { UserContext } from './index'

function Deposit() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isLoading, isError, message } = useSelector((state) => state.transfers)

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


  const sum = useEffect(() => {
    let balance = 0;
    transfers.forEach(element => {
      balance += element.text;
      setBalance(balance)
    });
  }, [transfers])


  return (
    <div>
      <Card
        txtcolor="black"
        header={<p>Welcome {user.name} </p>}
        body={
          <div className="inside">
            <section className="heading">
              <h1 className="title" >Make a Deposit</h1>
              <h2 className="balance">Your current balance is: {balance}</h2>
            </section>
            <DepositForm />

          </div>
        }
      />
    </div>
  )

}



export default Deposit