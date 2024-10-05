import { Connection, PublicKey, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function sendTransaction(connection, fromKeypair, toPublicKey, amount) {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL, 
      })
    );

    const signature = await connection.sendTransaction(transaction, fromKeypair);
    await connection.confirmTransaction(signature);
    console.log('Transaction successful!', signature);
  } catch (error) {
    console.error('Transaction error:', error);
  }
}

// Example usage:
const connection = new Connection('https://api.mainnet-beta.solana.com');
const fromKeypair = Keypair.fromSecretKey('...'); // Replace with sender's keypair
const toPublicKey = new PublicKey('...'); // Replace with recipient's public key
sendTransaction(connection, fromKeypair, toPublicKey, 0.1);