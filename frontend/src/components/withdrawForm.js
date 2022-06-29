import { React, useContext, useEffect } from 'react'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newTransfer } from '../features/transfers/transferSlice'
import { UserContext } from '../index'

function WithdrawForm() {

    const [text, setText] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const value = useContext(UserContext);
    const { balance, setBalance } = value

    const { user } = useSelector((state) => state.auth)
    const { transfers, isLoading, isError, message } = useSelector((state) => state.transfers)

    const dispatch = useDispatch()

    const sum = useEffect(() => {
        let balance = 0;
        transfers.forEach(element => {
            balance += element.text;
            setBalance(balance)
        });
    }, [transfers])


    const onSubmit = (e) => {
        e.preventDefault()

        if (isNaN(text)) {
            setError("input must be a number.")
            setTimeout(() => setError(''), 1500)
        } else if (text > balance) {
            setError("Insufficient funds");
            setTimeout(() => setError(''), 1500);
        } else if (text <= 0) {
            setError("Must Be positive number.");
            setTimeout(() => setError(''), 1500);
        } else {
            dispatch(newTransfer({ text: -Math.abs(text) }))
            setSuccess(`Success: Here is your withdraw of $${text}.`)
            setTimeout(() => setSuccess(''), 3000);
            setError(null)
        }
        setText('')
    }


    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Withdraw Amount: </label>
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

export default WithdrawForm
