import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [supply, setSupply] = useState('');
    const [token, setToken] = useState(null);

    async function mintToken() {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, TokenABI, signer);
            const transaction = await contract.deploy(name, symbol, supply);
            await transaction.wait();
            setToken({
                name,
                symbol,
                supply
            });
        } else {
            alert('Please install MetaMask.');
        }
    }

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Token Name" />
            <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Token Symbol" />
            <input type="number" value={supply} onChange={(e) => setSupply(e.target.value)} placeholder="Initial Supply" />
            <button onClick={mintToken}>Mint Token</button>
            {token && (
                <div>
                    <h1>{token.symbol}</h1>
                    <p>Name: {token.name}</p>
                    <p>Supply: {token.supply}</p>
                </div>
            )}
        </div>
    );
}
