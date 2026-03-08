import React, { useState, useEffect } from 'react';
import { disconnectWallet, onAccountsChanged, getTokenBalance } from '../utils/Web3';

const Navbar = ({ onLogin, isLoggedIn, address, setAddress, isConnecting }) => {
  const [tokenBalance, setTokenBalance] = useState('0');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDisconnect = () => {
    disconnectWallet();
    setAddress(null);
    setTokenBalance('0');
    setShowDropdown(false);
  };

  useEffect(() => {
    onAccountsChanged((newAddress) => {
      if (newAddress) {
        setAddress(newAddress);
      } else {
        disconnectWallet();
        setAddress(null);
        setTokenBalance('0');
        setShowDropdown(false);
      }
    });
  }, [setAddress]);

  useEffect(() => {
    if (!address) return;

    let active = true;
    const timer = setTimeout(() => {
      (async () => {
        try {
          const balance = await getTokenBalance(address);
          if (!active) return;
          setTokenBalance(parseFloat(balance).toFixed(2));
        } catch (error) {
          console.error('Error loading token balance:', error);
        }
      })();
    }, 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [address]);

  const handleConnect = async () => {
    try {
      await onLogin();
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet. Please make sure MetaMask is installed and unlocked.');
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert('Address copied to clipboard!');
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-neon/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-neon font-bold text-xl tracking-wider">
              <span className="glitch" data-text="SENTINEL_SYS">
                SENTINEL_SYS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isLoggedIn && (
              <div className="hidden md:flex gap-6 text-sm font-bold tracking-wider">
                <a href="#features" className="text-gray-400 hover:text-neon transition-colors">
                  [ FEATURES ]
                </a>
                <a href="#about" className="text-gray-400 hover:text-neon transition-colors">
                  [ PROTOCOL ]
                </a>
                <a href="#docs" className="text-gray-400 hover:text-neon transition-colors">
                  [ DOCS ]
                </a>
              </div>
            )}

            {!address ? (
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="relative px-6 py-2 bg-black border-2 border-neon text-neon font-bold text-sm tracking-wider hover:bg-neon hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="corner-tl"></div>
                <div className="corner-tr"></div>
                <div className="corner-bl"></div>
                <div className="corner-br"></div>
                {isConnecting ? '[ CONNECTING... ]' : '[ CONNECT_WALLET ]'}
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative px-6 py-2 bg-black border-2 border-neon text-neon font-bold text-sm tracking-wider hover:bg-neon/10 transition-all duration-300"
                >
                  <div className="corner-tl"></div>
                  <div className="corner-tr"></div>
                  <div className="corner-bl"></div>
                  <div className="corner-br"></div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs">💰 {tokenBalance} RWT</span>
                    <span className="text-white">|</span>
                    <span>{formatAddress(address)}</span>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-black border-2 border-neon shadow-lg shadow-neon/20">
                    <div className="p-4 space-y-3">
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        Connected Wallet
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-neon">
                          {formatAddress(address)}
                        </span>
                        <button
                          onClick={copyAddress}
                          className="text-xs text-gray-400 hover:text-neon transition-colors"
                        >
                          [ COPY ]
                        </button>
                      </div>
                      <div className="border-t border-gray-800 pt-3">
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                          Token Balance
                        </div>
                        <div className="text-lg font-bold text-neon">
                          {tokenBalance} RWT
                        </div>
                      </div>
                      <button
                        onClick={handleDisconnect}
                        className="w-full py-2 bg-red-900/20 border border-red-500 text-red-500 text-sm font-bold hover:bg-red-900/40 transition-colors"
                      >
                        [ DISCONNECT ]
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
