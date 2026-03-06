import { useState } from 'react';
import { analyzeURL } from '../utils/phishingDetector';

function WebsiteDetection() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
  setIsAnalyzing(true);
  const analysis = await analyzeURL(url);
  setResult(analysis);
  setIsAnalyzing(false);
};


  const handleClear = () => {
    setUrl('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Website URL Detection
          </h1>
          <p className="text-lg text-gray-600">
            Check if a website URL is safe or potentially a phishing attempt
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-slide-up">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Enter Website URL
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </button>
              {url && (
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {result && (
          <div className="animate-slide-up">
            <div
              className={`rounded-2xl shadow-xl p-8 mb-6 ${
                result.isPhishing
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300'
                  : 'bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      result.isPhishing ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {result.isPhishing ? (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {result.isPhishing ? 'Phishing Detected' : 'URL Appears Safe'}
                    </h2>
                    <p className="text-gray-600">{result.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold ${
                      result.isPhishing ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {result.confidence}%
                  </div>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
              </div>

              <div className="bg-white bg-opacity-70 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detection Indicators:
                </h3>
                <ul className="space-y-2">
                  {result.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span
                        className={`mt-1 w-2 h-2 rounded-full ${
                          result.isPhishing ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      ></span>
                      <span className="text-gray-700">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.isPhishing && (
                <div className="mt-6 bg-red-100 border-l-4 border-red-500 p-4 rounded">
                  <h4 className="font-bold text-red-800 mb-2">
                    Recommended Actions:
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Do not enter any personal information on this site</li>
                    <li>Do not download files or click suspicious links</li>
                    <li>Report this URL to your security team or IT department</li>
                    <li>Close the browser tab immediately</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Tips for Identifying Phishing URLs:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Check for HTTPS and a valid security certificate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Look for misspellings in the domain name</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Be cautious of URLs with excessive hyphens or numbers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Avoid clicking shortened URLs from unknown sources</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WebsiteDetection;
