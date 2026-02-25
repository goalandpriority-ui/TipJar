// pages/tipjar.js
import { useState, useEffect } from 'react'
import { useSigner } from 'wagmi'

export default function TipJar() {
  const { data: signer } = useSigner()
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (signer) {
      signer.getAddress().then((addr) => setAddress(addr))
    }
  }, [signer])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Tip Jar</h1>
      {signer ? (
        <p>Connected wallet: {address}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  )
}
