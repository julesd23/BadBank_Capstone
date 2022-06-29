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
import WithdrawForm from './components/withdrawForm';

function Withdraw() {

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
    <>
      <section className="heading">
        <h1>Welcome {user && user.name} </h1>
        <p>Make a Withdraw</p>
      </section>
      <WithdrawForm />
      <div>
        Your current balance is: {balance}
      </div>
    </>
  )

}

export default Withdraw
