import React from 'react';
import { getBalance } from '../../utils/Web3';

const ProfileTab = ({ userAddress, onLogout }) => {
  const [ethBalance, setEthBalance] = React.useState('0');

  React.useEffect(() => {
    if (!userAddress) return;

    let active = true;
    const timer = setTimeout(() => {
      (async () => {
        try {
          const balance = await getBalance(userAddress);
          if (!active) return;
          setEthBalance(parseFloat(balance).toFixed(4));
        } catch (error) {
          console.error('Error loading ETH balance:', error);
        }
      })();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [userAddress]);

  const copyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    alert('Address copied!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative p-8 bg-black/60 border-2 border-neon text-center">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <div className="text-6xl mb-4">??</div>
        <h2 className="text-2xl font-black text-neon mb-2">SENTINEL PROFILE</h2>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <span className="font-mono text-sm">{userAddress}</span>
          <button onClick={copyAddress} className="text-neon hover:text-white text-xs">
            ??
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Reports Submitted', value: '12' },
          { label: 'Reports Validated', value: '34' },
          { label: 'Reputation Score', value: '87' },
          { label: 'Member Since', value: 'Feb 2025' }
        ].map((stat, idx) => (
          <div key={idx} className="relative p-4 bg-black/40 border border-neon/30 text-center">
            <div className="corner-tl"></div>
            <div className="corner-tr"></div>
            <div className="corner-bl"></div>
            <div className="corner-br"></div>
            <div className="text-2xl font-black text-neon mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="relative p-6 bg-black/60 border border-neon/30">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <h3 className="text-xl font-black text-neon mb-4">WALLET INFORMATION</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Network</span>
            <span className="text-white font-bold">Hardhat (localhost)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">ETH Balance</span>
            <span className="text-white font-bold">{ethBalance} ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Address</span>
            <span className="text-white font-mono text-sm">{userAddress.substring(0, 20)}...</span>
          </div>
        </div>
      </div>

      <div className="relative p-6 bg-black/60 border border-neon/30">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <h3 className="text-xl font-black text-neon mb-4">ACHIEVEMENTS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '??', title: 'First Report', earned: true },
            { icon: '?', title: 'Validator', earned: true },
            { icon: '??', title: 'Sharp Eye', earned: false },
            { icon: '??', title: 'Elite Defender', earned: false }
          ].map((achievement, idx) => (
            <div
              key={idx}
              className={`p-4 text-center border ${
                achievement.earned ? 'border-neon bg-neon/5' : 'border-gray-800 opacity-40'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="text-xs text-gray-400">{achievement.title}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full py-3 bg-red-900/20 border-2 border-red-500 text-red-500 font-bold hover:bg-red-900/40 transition-colors"
      >
        [ DISCONNECT WALLET ]
      </button>
    </div>
  );
};

export default ProfileTab;
