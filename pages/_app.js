// pages/_app.js
import '../styles/globals.css'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { provider } = configureChains([mainnet], [publicProvider()])
const client = createClient({
  autoConnect: true,
  provider
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
