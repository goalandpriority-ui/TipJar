import { useState } from 'react'
import TipJar from '../tipjar'

export default function Home() {
  const [tips, setTips] = useState([])

  const addTip = (tip) => {
    setTips([tip, ...tips])
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>💰 Tip Jar</h1>
      <TipJar onNewTip={addTip} />
      {tips.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Recent Tips</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tips.map((t, i) => (
              <li key={i} style={{ margin: '10px 0', background: '#f1f1f1', padding: '10px', borderRadius: '5px' }}>
                {t.message} - ${t.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
