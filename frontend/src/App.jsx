import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [account, setAccount] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [threats, setThreats] = useState([]);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }

  async function submitThreat() {
    try {
      const res = await fetch(`${API}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet: account,
          category: title,
          data: description,
        }),
      });

      const result = await res.json();
      console.log(result);

      setTitle("");
      setDescription("");
      fetchThreats();
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchThreats() {
    try {
      const res = await fetch(`${API}/api/reports`);
      const data = await res.json();
      setThreats(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchThreats();
  }, []);

  return (
    <div className="app">
      {!account ? (
        <div className="landing">
          <h1>Decentralized Threat Intelligence</h1>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      ) : (
        <div className="dashboard">
          <h1>Threat Intelligence Dashboard</h1>
          <p>Connected: {account}</p>

          <div className="card">
            <h3>Submit Threat</h3>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Malware">Malware</option>
              <option value="Phishing">Phishing</option>
              </select>

            <textarea
              placeholder="Threat description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={submitThreat}>Submit</button>
          </div>

          <div className="card">
            <h3>Threat Feed</h3>
            {threats.length === 0 ? (
              <p>No threats yet.</p>
            ) : (
              threats.map((t) => (
                <div key={t._id} className="threat">
                  <p><b>Category:</b> {t.category}</p>
                  <p><b>Wallet:</b> {t.wallet}</p>
                  <p><b>Hash:</b> {t.hash}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
