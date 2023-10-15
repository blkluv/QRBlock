import Head from "next/head";

import React, { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { GiftSolanaMain } from "@/components/solanaGift/main";
import st from "@/styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const Index: FC = () => {
   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const network = WalletAdapterNetwork.Devnet;

   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

   const wallets = useMemo(
      () => [
         /**
          * Wallets that implement either of these standards will be available automatically.
          *
          *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
          *     (https://github.com/solana-mobile/mobile-wallet-adapter)
          *   - Solana Wallet Standard
          *     (https://github.com/solana-labs/wallet-standard)
          *
          * If you wish to support a wallet that supports neither of those standards,
          * instantiate its legacy wallet adapter here. Common legacy adapters can be found
          * in the npm package `@solana/wallet-adapter-wallets`.
          */
         new PhantomWalletAdapter(),
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
   );

   return (
      <>
         <Head>
            <title>QRBlock-Demo</title>
            <meta name="description" content="Create new WEB3.0 ecosystem with QRBlock" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.svg" />
         </Head>
         <main>
            <ConnectionProvider endpoint={endpoint}>
               <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                     <GiftSolanaMain />
                  </WalletModalProvider>
               </WalletProvider>
            </ConnectionProvider>
         </main>
      </>
   );
};

export default Index;
