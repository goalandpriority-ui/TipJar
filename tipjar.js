import { useState } from 'react';

export default function TipJar() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTip = () => {
    alert(`Tip Sent: $${amount} - "${message}"`);
    setAmount('');
    setMessage('');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Tip Jar 💰</h1>

      <input
        type="number"
        placeholder="Enter tip amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Leave a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <button
        onClick={handleTip}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Tip
      </button>
    </div>
  );
}