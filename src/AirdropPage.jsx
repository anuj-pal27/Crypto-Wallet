import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";

const AirdropPage = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getBalance();
  });
  const getBalance = async () => {
    const balanceInSOL = await connection.getBalance(
      new PublicKey(wallet.publicKey)
    );
    setBalance(balanceInSOL / 10 ** 9);
  };

  const sendAirDropToUser = async () => {
    await connection.requestAirdrop(wallet.publicKey, amount * 10 ** 9);
    alert("Airdrop successful");
  };

  const handleChange = async (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8 bg-black">
        Airdrop
      </h1>
      <div className="flex gap-1 bg-black my-4 justify-between">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(event) => handleChange(event)}
          className="border border-gray-600 rounded-lg h-10 px-4 w-4/6"
        />
        <button
          className="rounded-lg h-10 px-2 bg-[#512da8] disabled:bg-gray-700"
          onClick={sendAirDropToUser}
          disabled={!amount}
        >
          Request Airdrop
        </button>
      </div>
      {wallet.connected ? (
        <div className="text-center bg-black font-semibold">
          <p className="bg-black">
            Connected to Wallet Address :{" "}
            <span className="text-[#512da8] bg-black">
              {wallet.publicKey.toString()}
            </span>
          </p>
          Your Balance :{" "}
          <span className="text-[#512da8] bg-black">{balance} SOL</span>
        </div>
      ) : (
        <div className="text-center bg-black font-semibold">
          Connect your wallet
        </div>
      )}
    </>
  );
};

export default AirdropPage;
