import { useState } from 'react'
import TipJar from './tipjar'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function Home() {
  const [tips, setTips] = useState([])
  const { address } = useAccount()
  const { connect } = useConnect({ connector: new InjectedConnector() })
  const { disconnect } = useDisconnect()

  const addTip = (tip) => setTips([tip, ...tips])

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>💰 Tip Jar</h1>

      {!address ? (
        <button onClick={() => connect()} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
          Connect Wallet
        </button>
      ) : (
        <button onClick={() => disconnect()} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
          Disconnect Wallet ({address.substring(0,6)}...)
        </button>
      )}

      <TipJar onNewTip={addTip} />

      {tips.length > 0 && (
        <div style={{ marginTop: '30px', textAlign: 'left' }}>
          <h2>Recent Tips</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tips.map((t, i) => (
              <li key={i} style={{ margin: '10px 0', background: '#f1f1f1', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>@{t.username}</strong> - ${t.amount} - {t.message}</span>
                <button onClick={() => {
                  const text = `@${t.username} just tipped $${t.amount} – "${t.message}"`
                  const url = `https://warpcast.com/?text=${encodeURIComponent(text)}`
                  window.open(url, '_blank')
                }} style={{ cursor: 'pointer', background: '#3b49df', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
                  Share
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
