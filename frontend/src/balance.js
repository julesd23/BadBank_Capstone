import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useContext, useEffect, useState, useMemo } from 'react'
import { Card } from './context'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getTransfers, reset } from './features/transfers/transferSlice'


import { UserContext } from '.'

function Balance() {

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
      <section className="heading">
        <h1 className="balance-page">Welcome {user && user.name}, your current balance is: ${balance}</h1>
      </section>
    </div>
  )

}

export default Balance