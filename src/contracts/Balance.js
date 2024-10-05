import { Connection, PublicKey , LAMPORTS_PER_SOL} from "@solana/web3.js";

async function getSolBalance(connection, publicKey) {
  try {
    const balance = await connection.getBalance(publicKey);
    console.log(`SOL balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    return balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

// Example usage:
const connection = new Connection("https://api.mainnet-beta.solana.com");
const userPublicKey = new PublicKey("...");
getSolBalance(connection, userPublicKey);
