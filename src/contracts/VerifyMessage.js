import { Keypair,nacl } from '@solana/web3.js';
import bs58 from 'bs58'; // For encoding the signature

async function signMessage(message, keypair) {
  try {
    const signature = nacl.sign.detached(
      new TextEncoder().encode(message),
      keypair.secretKey
    );

    // You typically wouldn't log the private key!
    console.log("Message: ", message); 
    console.log("Signer's Public Key:", keypair.publicKey.toString());
    console.log('Signature (Base58):', bs58.encode(signature));

    return signature;
  } catch (error) {
    console.error('Signing error:', error);
  }
}

// Example usage:
const messageToSign = 'This message proves I control this wallet.';
const userKeypair = Keypair.fromSecretKey("..."); // Replace with the user's keypair
signMessage(messageToSign, userKeypair);