// wagmiConfig.js
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import { mainnet } from 'wagmi/chains'

// Chains and provider setup
const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

// Wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
})

export default wagmiConfig
export { chains }
