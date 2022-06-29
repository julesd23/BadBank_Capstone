import React from 'react'

function TransferItem({transfer}) {
  const type = transfer.text > 0 ? "Deposit" : "Withdraw";
  return (
    <div className="transfer">
      <div>
      Type: {type} Received: {new Date(transfer.createdAt).toLocaleString('en-us')} 
        <h2> Amount: ${transfer.text}</h2>
      </div>
    </div>
  )
}

export default TransferItem
