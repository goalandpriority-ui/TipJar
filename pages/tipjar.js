import { useState } from 'react'

export default function TipJar({ onNewTip }) {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount) return alert('Enter tip amount!')

    const tip = { amount, message: message || 'No message' }
    onNewTip(tip)

    setAmount('')
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="number"
        placeholder="Amount in USD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Your message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        background: '#4caf50',
        color: '#fff',
        border: 'none'
      }}>
        Send Tip
      </button>
    </form>
  )
}
