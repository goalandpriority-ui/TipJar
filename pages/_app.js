// pages/_app.js
import '../styles/globals.css'
import { WagmiConfig } from 'wagmi'
import wagmiConfig from '../wagmiConfig'

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
