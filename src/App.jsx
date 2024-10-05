import { useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import AirdropPage from "./AirdropPage";
import TransactionPage from "./TransactionPage";
import { SignMessage } from "./SignMessage";
function App() {
  const [section, setSection] = useState("verify");

  const handleSectionChange = (section) => {
    setSection(section);
  };

  // const network = WalletAdapterNetwork.Devnet;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // const wallets = useMemo(
  //   () => [
  //     new UnsafeBurnerWalletAdapter(),
  //   ],
  //   [network]
  // );
  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/SfymCb3jHNtavsH0Ht_x4nF75gbUnPrM"
        }
        autoConnect
      >
        <div className="bg-black md:w-1/2 w-11/12 mx-auto p-6 my-[10vh] rounded-lg">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="flex justify-center gap-8 bg-black">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              <div className="bg-black flex justify-between my-8 px-8">
                <button
                  className={`h-10 rounded-lg font-semibold w-1/4 border border-white/35 ${
                    section === "airdrop" ? "bg-[#512da8]" : ""
                  }`}
                  onClick={() => handleSectionChange("airdrop")}
                >
                  AirDrop
                </button>
                <button
                  className={`h-10 rounded-lg font-semibold w-1/4 border border-white/35 ${
                    section === "transaction" ? "bg-[#512da8]" : ""
                  }`}
                  onClick={() => handleSectionChange("transaction")}
                >
                  Transaction
                </button>
                <button
                  className={`h-10 rounded-lg font-semibold w-1/4 border border-white/35 ${
                    section === "verify" ? "bg-[#512da8]" : ""
                  }`}
                  onClick={() => handleSectionChange("verify")}
                >
                  Verify Message
                </button>
              </div>
              <div className="bg-black">
                {section === "airdrop" && <AirdropPage />}
                {section === "transaction" && <TransactionPage />}
                {section === "verify" && <SignMessage />}
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </div>
      </ConnectionProvider>
    </>
  );
}

export default App;
