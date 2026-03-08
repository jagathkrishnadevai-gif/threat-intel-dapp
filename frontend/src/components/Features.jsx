import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '???',
      title: 'SUBMIT_THREATS',
      description: 'Report malware, phishing, exploits, and vulnerabilities. Your intelligence helps protect the network.',
      stats: 'Earn 10-100 STOK per verified report'
    },
    {
      icon: '?',
      title: 'VALIDATE_REPORTS',
      description: 'Review and verify threat submissions from the community. Build your reputation as a trusted validator.',
      stats: 'Earn 5-20 STOK per validation'
    },
    {
      icon: '??',
      title: 'SCAN_FILES',
      description: 'Upload files for instant threat analysis. AI-powered scanning with blockchain-verified results.',
      stats: 'Free for token holders'
    },
    {
      icon: '??',
      title: 'EARN_REWARDS',
      description: 'Get paid in STOK tokens for contributing to network security. Redeem, stake, or trade your earnings.',
      stats: 'Transparent, on-chain distribution'
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4">
            <span className="text-neon">PROTOCOL</span>
            <span className="text-white">_FEATURES</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powered by smart contracts and decentralized consensus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 bg-black/60 border border-neon/30 hover:border-neon transition-all duration-300 group"
            >
              <div className="corner-tl group-hover:!w-6 group-hover:!h-6 transition-all"></div>
              <div className="corner-tr group-hover:!w-6 group-hover:!h-6 transition-all"></div>
              <div className="corner-bl group-hover:!w-6 group-hover:!h-6 transition-all"></div>
              <div className="corner-br group-hover:!w-6 group-hover:!h-6 transition-all"></div>

              <div className="flex items-start gap-4">
                <div className="text-5xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-neon mb-3 tracking-wider">
                    [ {feature.title} ]
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block px-3 py-1 bg-neon/10 border border-neon/30 text-neon text-xs font-bold tracking-wider">
                    {feature.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-3xl font-black text-center mb-12">
            <span className="text-white">HOW_IT</span>
            <span className="text-neon">_WORKS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Connect', desc: 'Link your Web3 wallet' },
              { step: '02', title: 'Submit', desc: 'Report threats to the network' },
              { step: '03', title: 'Validate', desc: 'Community verifies submissions' },
              { step: '04', title: 'Earn', desc: 'Receive STOK token rewards' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-6xl font-black text-neon/20 mb-4">{item.step}</div>
                <div className="text-xl font-bold text-white mb-2">{item.title}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
                {idx < 3 && (
                  <div className="hidden md:block text-neon text-2xl mt-4">?</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
