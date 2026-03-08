// CommunityTab.jsx
import React, { useState } from 'react';

export const CommunityTab = () => {
  const [message, setMessage] = useState('');
  const [messages] = useState([
    { user: 'ADMIN', text: 'Welcome to SentinelNet community!', time: '10:23', official: true },
    { user: '0x742d...3f8a', text: 'Just submitted a critical phishing report', time: '10:25' },
    { user: '0x891c...7b2e', text: 'Validated 3 reports today ??', time: '10:27' }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative p-6 bg-black/60 border border-neon/30 h-[600px] flex flex-col">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <h3 className="text-xl font-black text-neon mb-4">GLOBAL CHAT</h3>
        
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 ${msg.official ? 'bg-neon/10 border-l-2 border-neon' : 'bg-black/50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold text-sm ${msg.official ? 'text-neon' : 'text-gray-400'}`}>
                  {msg.user}
                </span>
                <span className="text-xs text-gray-600">{msg.time}</span>
              </div>
              <div className="text-gray-300">{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-black border border-neon/30 text-white focus:border-neon outline-none"
          />
          <button className="px-6 py-2 bg-neon text-black font-bold hover:bg-white">
            SEND
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative p-4 bg-black/60 border border-neon/30">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>
          <h4 className="text-sm font-bold text-neon mb-3">TOP CONTRIBUTORS</h4>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">0x{i}23...{i}abc</span>
              <span className="text-neon font-bold">{100 - i * 10} pts</span>
            </div>
          ))}
        </div>

        <div className="relative p-4 bg-black/60 border border-neon/30">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>
          <h4 className="text-sm font-bold text-neon mb-3">RECENT ACTIVITY</h4>
          <div className="space-y-2 text-xs text-gray-400">
            <div>• New report verified</div>
            <div>• 5 users joined</div>
            <div>• 10K STOK distributed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;
