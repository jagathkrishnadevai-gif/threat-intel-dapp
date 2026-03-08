import React, { useState } from 'react';
import { transferTokens, claimRewards, getPendingRewards } from '../../services/Rewardservice';

const RewardsTab = ({ userAddress, tokenBalance }) => {
  const [claiming, setClaiming] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferring, setTransferring] = useState(false);
  const [pendingRewards, setPendingRewards] = useState('0');

  React.useEffect(() => {
    if (!userAddress) return;

    let active = true;
    const loadPendingRewards = async () => {
      try {
        const pending = await getPendingRewards(userAddress);
        if (!active) return;
        setPendingRewards(parseFloat(pending || '0').toFixed(2));
      } catch (error) {
        if (!active) return;
        setPendingRewards('0');
      }
    };

    loadPendingRewards();
    return () => {
      active = false;
    };
  }, [userAddress]);

  const transactions = [
    { id: 1, date: '2025-02-10', amount: 50, type: 'Submission', status: 'Completed' },
    { id: 2, date: '2025-02-11', amount: 20, type: 'Validation', status: 'Completed' },
    { id: 3, date: '2025-02-12', amount: 100, type: 'Submission', status: 'Processing' }
  ];

  const handleClaim = async () => {
    setClaiming(true);
    try {
      await claimRewards();
      alert('Rewards claimed successfully!');
      if (userAddress) {
        const pending = await getPendingRewards(userAddress);
        setPendingRewards(parseFloat(pending || '0').toFixed(2));
      }
    } catch (error) {
      alert('Failed to claim rewards: ' + error.message);
    } finally {
      setClaiming(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferAddress || !transferAmount) {
      alert('Please enter both address and amount');
      return;
    }

    setTransferring(true);
    try {
      await transferTokens(transferAddress, transferAmount);
      alert('Transfer successful!');
      setTransferAddress('');
      setTransferAmount('');
    } catch (error) {
      alert('Transfer failed: ' + error.message);
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative p-6 bg-black/60 border-2 border-neon">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>
          <div className="text-sm text-gray-400 mb-2">TOTAL BALANCE</div>
          <div className="text-4xl font-black text-neon">{tokenBalance}</div>
          <div className="text-xs text-gray-500 mt-1">RWT TOKENS</div>
        </div>

        <div className="relative p-6 bg-black/60 border border-neon/30">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>
          <div className="text-sm text-gray-400 mb-2">PENDING REWARDS</div>
          <div className="text-4xl font-black text-yellow-500">{pendingRewards}</div>
          <div className="text-xs text-gray-500 mt-1">AWAITING CLAIM</div>
        </div>

        <div className="relative p-6 bg-black/60 border border-neon/30">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>
          <div className="text-sm text-gray-400 mb-2">TOTAL EARNED</div>
          <div className="text-4xl font-black text-green-500">347.2</div>
          <div className="text-xs text-gray-500 mt-1">ALL TIME</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative p-6 bg-black/60 border border-neon/30">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>

          <h3 className="text-xl font-black text-neon mb-4">CLAIM REWARDS</h3>
          <p className="text-gray-400 text-sm mb-4">
            You have {pendingRewards} RWT pending. Claim them to your wallet.
          </p>
          <button
            onClick={handleClaim}
            disabled={claiming || Number(pendingRewards) <= 0}
            className="w-full py-3 bg-neon text-black font-bold hover:bg-white transition-colors disabled:opacity-50"
          >
            {claiming ? '[ CLAIMING... ]' : `[ CLAIM ${pendingRewards} RWT ]`}
          </button>
        </div>

        <div className="relative p-6 bg-black/60 border border-neon/30">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>

          <h3 className="text-xl font-black text-neon mb-4">TRANSFER TOKENS</h3>
          <input
            type="text"
            placeholder="Recipient address"
            value={transferAddress}
            onChange={(e) => setTransferAddress(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-black border border-neon/30 text-white focus:border-neon outline-none text-sm"
          />
          <input
            type="number"
            placeholder="Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-black border border-neon/30 text-white focus:border-neon outline-none text-sm"
          />
          <button
            onClick={handleTransfer}
            disabled={transferring}
            className="w-full py-3 bg-black border-2 border-neon text-neon font-bold hover:bg-neon hover:text-black transition-colors disabled:opacity-50"
          >
            {transferring ? '[ TRANSFERRING... ]' : '[ SEND TOKENS ]'}
          </button>
        </div>
      </div>

      <div className="relative p-6 bg-black/60 border border-neon/30">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <h3 className="text-xl font-black text-neon mb-4">TRANSACTION HISTORY</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-black/50 border border-neon/20">
              <div>
                <div className="font-bold text-white">{tx.type}</div>
                <div className="text-xs text-gray-500">{tx.date}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-neon">+{tx.amount} RWT</div>
                <div className={`text-xs ${tx.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;
