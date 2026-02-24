import { useState } from "react";
import { Web3Provider, parseEther } from "ethers"; // ethers v6+

export default function TipJar() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [tips, setTips] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const CREATOR_WALLET = "0xYOUR_WALLET_ADDRESS"; // replace with your wallet

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWallet(accounts[0]);
      } catch (err) {
        alert("Wallet connection failed");
      }
    } else {
      alert("Install MetaMask!");
    }
  };

  const sendTip = async () => {
    if (!wallet || !amount) return alert("Wallet & amount required");
    const fee = parseFloat(amount) * 0.05; // 5% app fee
    const total = parseFloat(amount);

    try {
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Send ETH minus fee to creator
      await signer.sendTransaction({
        to: CREATOR_WALLET,
        value: parseEther((total - fee).toString()),
      });

      // Update recent tips
      setTips([{ from: wallet, value: (total - fee).toFixed(4) }, ...tips]);

      // Update total earnings
      setTotalEarnings(prev => prev + fee);

      alert(`Tip sent! App earned ${fee.toFixed(4)} ETH`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "500px", margin: "auto" }}>
      <h1>🐙 Tip Jar</h1>

      {!wallet ? (
        <button onClick={connectWallet} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Connect Wallet
        </button>
      ) : (
        <div style={{ marginBottom: "1rem" }}>
          <p><strong>Connected:</strong> {wallet}</p>
          <input
            type="number"
            placeholder="Amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: "0.5rem", width: "150px", marginRight: "0.5rem" }}
          />
          <button onClick={sendTip} style={{ padding: "0.5rem 1rem" }}>Send Tip</button>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h2>💰 Total App Earnings: {totalEarnings.toFixed(4)} ETH</h2>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Recent Tips</h2>
        <ul>
          {tips.length === 0 && <li>No tips yet 😴</li>}
          {tips.map((tip, idx) => (
            <li key={idx}>{tip.from} tipped {tip.value} ETH</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>🏆 Top Tippers</h2>
        <ul>
          {tips
            .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
            .slice(0, 5)
            .map((tip, idx) => (
              <li key={idx}>{tip.from}: {tip.value} ETH</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
