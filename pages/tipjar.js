import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'

export default function TipJar({ onNewTip }) {
  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username) return alert('Enter Farcaster username!')
    if (!amount) return alert('Enter tip amount!')
    if (!signer) return alert('Connect your wallet first!')

    // Convert USD → ETH (example rate 1 USD = 0.0005 ETH)
    const ethAmount = (parseFloat(amount) * 0.0005).toFixed(6)

    try {
      // send ETH to treasury wallet
      const tx = await signer.sendTransaction({
        to: '0xYourTreasuryAddressHere', // replace with your wallet
        value: ethers.utils.parseEther(ethAmount.toString())
      })
      await tx.wait()

      const tip = { username, amount, message: message || 'No message' }
      onNewTip(tip)

      // Farcaster share
      const text = `@${username} just tipped $${amount} – "${message || 'No message'}"`
      const url = `https://warpcast.com/?text=${encodeURIComponent(text)}`
      window.open(url, '_blank')

      // Reset inputs
      setUsername('')
      setAmount('')
      setMessage('')
    } catch (err) {
      console.error(err)
      alert('Transaction failed!')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Farcaster username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
      />
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
