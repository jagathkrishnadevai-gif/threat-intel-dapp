import React, { useState, useEffect } from 'react';
import { getAddress, getTokenBalance } from '../utils/Web3';
import ReportsTab from './dashboard/Reportstab';
import ScannerTab from './dashboard/ScannerTab';
import CommunityTab from './dashboard/Communitytab';
import RewardsTab from './dashboard/Rewardstab';
import ProfileTab from './dashboard/Profiletab';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('reports');
  const [userAddress, setUserAddress] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      (async () => {
        try {
          const address = await getAddress();
          if (!active) return;
          setUserAddress(address);

          const balance = await getTokenBalance(address);
          if (!active) return;
          setTokenBalance(parseFloat(balance).toFixed(2));
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      })();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const tabs = [
    { id: 'reports', label: 'REPORTS', icon: '📋' },
    { id: 'scanner', label: 'SCANNER', icon: '🔍' },
    { id: 'community', label: 'COMMUNITY', icon: '💬' },
    { id: 'rewards', label: 'REWARDS', icon: '💰' },
    { id: 'profile', label: 'PROFILE', icon: '👤' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reports':
        return <ReportsTab userAddress={userAddress} />;
      case 'scanner':
        return <ScannerTab />;
      case 'community':
        return <CommunityTab />;
      case 'rewards':
        return <RewardsTab userAddress={userAddress} tokenBalance={tokenBalance} />;
      case 'profile':
        return <ProfileTab userAddress={userAddress} onLogout={onLogout} />;
      default:
        return <ReportsTab userAddress={userAddress} />;
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-black">
              <span className="text-white">SENTINEL</span>
              <span className="text-neon">_COMMAND</span>
            </h1>
            <div className="relative px-6 py-3 bg-black border-2 border-neon">
              <div className="corner-tl"></div>
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <div className="text-neon font-bold">💰 {tokenBalance} RWT</div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 font-bold text-sm tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-neon text-black'
                    : 'bg-black border border-neon/30 text-gray-400 hover:text-neon hover:border-neon'
                }`}
              >
                {activeTab === tab.id && (
                  <>
                    <div className="corner-tl !border-black"></div>
                    <div className="corner-tr !border-black"></div>
                    <div className="corner-bl !border-black"></div>
                    <div className="corner-br !border-black"></div>
                  </>
                )}
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
