import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useEffect, useState, useContext, useMemo } from 'react'
import { Card } from './context'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { newTransfer, getTransfers, reset } from './features/transfers/transferSlice'
import initialState from './features/transfers/transferSlice'
import DepositForm from './components/depositForm'
import TransferItem from './components/transferItem'
import { UserContext } from './index'

function AllData() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isLoading, isError, message } = useSelector((state) => state.transfers)

  // const [show, setShow]     = React.useState(true);
  // const [status, setStatus] = React.useState('');  

  const value = useContext(UserContext);
  const { balance, setBalance } = value

    useEffect(() => {
    if(isError) {
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
            <h2>Recent Transactions</h2>
          </section>

          {/* <DepositForm /> */}

          <section className="content">
            {transfers.length > 0 ? (
              <div className="transfers">
                {transfers.map((transfer) => (
                  <TransferItem key={transfer._id} transfer={transfer}></TransferItem>
                ))}
              </div>
            ) : (
              <h3>There are no transactions to display</h3>
            )}
          </section>
          <div>
          Your current balance is: ${balance}
          </div>
          </>
  )

}

export default AllData