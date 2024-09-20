import { Buffer } from 'buffer';
import process from 'process';
import crypto from 'crypto-browserify';
import {
  DynamicContextProvider,
  DynamicWidget, // Assurez-vous que ceci est importé correctement
  FilterChain,
} from "@dynamic-labs/sdk-react-core";
import {
  EthereumIcon,
  SolanaIcon,
} from "@dynamic-labs/iconic";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "39e36c8b-b277-46ce-86d4-0dbf34180c37",
        walletConnectors: [
          EthereumWalletConnectors,
          SolanaWalletConnectors
        ],
        overrides: {
          views: [
            {
              type: "wallet-list",
              tabs: {
                items: [
                  {
                    label: { text: "All chains" },
                  },
                  {
                    label: { icon: <EthereumIcon /> },
                    walletsFilter: FilterChain("EVM"),
                    recommendedWallets: [
                      {
                        walletKey: "phantomevm",
                      },
                    ],
                  },
                  {
                    label: { icon: <SolanaIcon /> },
                    walletsFilter: FilterChain("SOL"),
                  },
                ],
              },
            },
          ],
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWidget /> {/* Le widget doit être rendu ici */}
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
