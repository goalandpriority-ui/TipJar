// pages/tipjar.js
import { useState } from 'react'
import { useSigner } from 'wagmi'
import { ethers } from 'ethers'

const tipInEth = (usd) => (usd * 0.0005).toString() // 1 USD ~ 0.0005 ETH, adjust as needed

export default function TipJar({ onNewTip }) {
  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const { data: signer } = useSigner()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !amount) return alert('Enter username and amount!')
    if (!signer) return alert('Connect wallet first!')

    try {
      // Send tip to your treasury/wallet
      await signer.sendTransaction({
        to: '0xYourTreasuryAddressHere', // Change to your wallet
        value: ethers.utils.parseEther(tipInEth(amount))
      })

      // Log tip locally
      const tip = { username, amount, message: message || 'No message' }
      onNewTip?.(tip)

      // Farcaster share link
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
    <div>
      <h2>💰 Tip Jar</h2>
      <form onSubmit={handleSubmit}>
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

      {/* Optional: show recent tips */}
      <div id="recent-tips"></div>
    </div>
  )
}
