import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

async function requestAirdrop(connection, publicKey) {
  try {
    console.log("Requesting airdrop...");
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL // Request 2 SOL
    );
    await connection.confirmTransaction(airdropSignature);
    console.log("Airdrop successful!");
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
}

// Example usage (assuming you have a connection and publicKey):
const connection = new Connection("https://api.mainnet-beta.solana.com");
const userPublicKey = new PublicKey("..."); // Replace with the user's public key
requestAirdrop(connection, userPublicKey);
