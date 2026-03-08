import React from 'react';

const Hero = ({ onLogin, isConnecting, address }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 border border-neon animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-neon animate-pulse delay-150"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            <span className="text-white glitch" data-text="SENTINEL">SENTINEL</span>
            <span className="text-neon">_NET</span>
          </h1>
          <div className="text-xl md:text-2xl font-bold tracking-[0.3em] text-gray-400 uppercase">
            Decentralized Threat Intelligence Mesh
          </div>
        </div>

        {/* Subtitle */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-300 leading-relaxed">
            Join the first <span className="text-neon font-bold">blockchain-powered</span> cybersecurity
            network. Submit threats, validate reports, and earn rewards for protecting the digital frontier.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="relative p-6 bg-black/40 border border-neon/30">
            <div className="corner-tl"></div>
            <div className="corner-tr"></div>
            <div className="corner-bl"></div>
            <div className="corner-br"></div>
            <div className="text-4xl font-black text-neon mb-2">1,247</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Threats Detected</div>
          </div>
          <div className="relative p-6 bg-black/40 border border-neon/30">
            <div className="corner-tl"></div>
            <div className="corner-tr"></div>
            <div className="corner-bl"></div>
            <div className="corner-br"></div>
            <div className="text-4xl font-black text-neon mb-2">523</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Active Defenders</div>
          </div>
          <div className="relative p-6 bg-black/40 border border-neon/30">
            <div className="corner-tl"></div>
            <div className="corner-tr"></div>
            <div className="corner-bl"></div>
            <div className="corner-br"></div>
            <div className="text-4xl font-black text-neon mb-2">89.2K</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Tokens Earned</div>
          </div>
        </div>

        {/* CTA Button */}
        {!address && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onLogin}
              disabled={isConnecting}
              className="relative group px-12 py-4 bg-neon text-black font-black text-lg tracking-wider hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="corner-tl !border-black"></div>
              <div className="corner-tr !border-black"></div>
              <div className="corner-bl !border-black"></div>
              <div className="corner-br !border-black"></div>
              {isConnecting ? '[ INITIALIZING... ]' : '[ ENTER_THE_MESH ]'}
            </button>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              MetaMask Required • Hardhat Network
            </p>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-neon text-2xl">↓</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mt-2">Scroll to Explore</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;