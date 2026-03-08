import React, { useState } from 'react';

const ScannerTab = () => {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults(null);
  };

  const handleScan = async () => {
    if (!file) return;

    setScanning(true);
    
    // Simulate AI scanning with Gemini API
    setTimeout(() => {
      setResults({
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2) + ' KB',
        threatLevel: Math.random() > 0.7 ? 'High' : 'Low',
        malwareDetected: Math.random() > 0.8,
        scanTime: '2.3s',
        hash: 'SHA256: ' + Math.random().toString(36).substring(2, 15)
      });
      setScanning(false);
    }, 2300);
  };

  return (
    <div className="space-y-6">
      <div className="relative p-8 bg-black/60 border-2 border-neon">
        <div className="corner-tl"></div>
        <div className="corner-tr"></div>
        <div className="corner-bl"></div>
        <div className="corner-br"></div>

        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-black text-neon mb-2">FILE SCANNER</h3>
          <p className="text-gray-400 mb-6">AI-powered threat detection with blockchain verification</p>

          <div className="max-w-md mx-auto">
            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-neon/30 hover:border-neon p-12 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-gray-400">
                  {file ? (
                    <>
                      <div className="text-neon font-bold mb-2">📄 {file.name}</div>
                      <div className="text-sm">Click to change file</div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl mb-2">⬆️</div>
                      <div>Drop file here or click to browse</div>
                    </>
                  )}
                </div>
              </div>
            </label>

            {file && (
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full mt-4 py-3 bg-neon text-black font-bold hover:bg-white transition-colors disabled:opacity-50"
              >
                {scanning ? '[ SCANNING... ]' : '[ START SCAN ]'}
              </button>
            )}
          </div>
        </div>
      </div>

      {results && (
        <div className="relative p-6 bg-black/40 border border-neon">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>

          <h4 className="text-xl font-black text-neon mb-4">SCAN RESULTS</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">File Name</div>
              <div className="text-white font-mono">{results.fileName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">File Size</div>
              <div className="text-white">{results.fileSize}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Threat Level</div>
              <div className={results.threatLevel === 'High' ? 'text-red-500' : 'text-green-500'}>
                {results.threatLevel}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Scan Time</div>
              <div className="text-white">{results.scanTime}</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500 mb-1">File Hash</div>
              <div className="text-white font-mono text-xs break-all">{results.hash}</div>
            </div>
          </div>

          <div className={`mt-4 p-4 border-2 ${results.malwareDetected ? 'border-red-500' : 'border-green-500'}`}>
            <div className="text-center">
              {results.malwareDetected ? (
                <>
                  <div className="text-red-500 text-4xl mb-2">⚠️</div>
                  <div className="text-red-500 font-bold">MALWARE DETECTED</div>
                </>
              ) : (
                <>
                  <div className="text-green-500 text-4xl mb-2">✓</div>
                  <div className="text-green-500 font-bold">FILE IS CLEAN</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerTab;