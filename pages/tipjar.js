// components/TipJar.js
'use client'
import { useState, useEffect } from 'react'
import { useSigner } from 'wagmi'
import { ethers } from 'ethers'

export default function TipJar() {
  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [recentTips, setRecentTips] = useState([])
  const { data: signer } = useSigner()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !amount) return alert('Enter username and amount!')
    if (!signer) return alert('Connect wallet first!')

    try {
      // Send tip
      await signer.sendTransaction({
        to: '0xYourTreasuryAddressHere', // Change to your wallet
        value: ethers.utils.parseEther((0.0005 * amount).toString())
      })

      const tip = { username, amount, message: message || 'No message' }
      setRecentTips([tip, ...recentTips])

      // Farcaster share
      const text = `@${username} just tipped $${amount} – "${message || 'No message'}"`
      const url = `https://warpcast.com/?text=${encodeURIComponent(text)}`
      window.open(url, '_blank')

      setUsername('')
      setAmount('')
      setMessage('')
    } catch (err) {
      console.error(err)
      alert('Transaction failed!')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>💰 Tip Jar</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Farcaster username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount USD"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Message (optional)"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send Tip</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Recent Tips</h3>
        {recentTips.length === 0 ? <p>No tips yet</p> : recentTips.map((tip, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
            ${tip.amount} – {tip.username} – {tip.message}
          </div>
        ))}
      </div>
    </div>
  )
}
