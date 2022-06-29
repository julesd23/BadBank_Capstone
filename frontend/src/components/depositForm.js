import React from 'react'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newTransfer } from '../features/transfers/transferSlice'

function DepositForm() {
  
  const [text, setText] = useState('')
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch()
  

  const onSubmit = (e) => {
    e.preventDefault()
    
    if(isNaN(text)) {
      setError("input must be a number.")
      setTimeout(() => setError(''), 1500)
    } else if (text <= 0) {
      setError("Must Be positive number.");
      setTimeout(() => setError(''), 1500);
    } else {
      dispatch(newTransfer({ text }))
      setSuccess(`Success: We have received your deposit of $${text}.`)
      setTimeout(() => setSuccess(''), 3000);
      setError(null)
    }
    setText('')
  }


  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Deposit Amount: </label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {error && <><div style={{ color: 'red' }}>{error}</div><br></br></>}
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Submit
          </button>
        </div>
        {success && <><div style={{ color: 'turquoise' }}>{success}</div><br></br></>}
      </form>
    </section>
  )
}

export default DepositForm
