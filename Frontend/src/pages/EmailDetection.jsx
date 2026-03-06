import { useState } from 'react';
import { analyzeEmail } from '../utils/phishingDetector';

function EmailDetection() {
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

 const handleAnalyze = async () => {
  setIsAnalyzing(true);
  const analysis = await analyzeEmail(emailContent);
  setResult(analysis);
  setIsAnalyzing(false);
};


  const handleClear = () => {
    setEmailContent('');
    setResult(null);
  };

  const loadExample = () => {
    const exampleEmail = `Dear Valued Customer,

Your account has been SUSPENDED due to unusual activity. URGENT ACTION REQUIRED!

To verify your account and restore access, please click here immediately and confirm your password, credit card details, and social security number.

This offer expires today. Act now or your account will be permanently closed.

Click this link: http://secure-bank-verify.tk/login

Best regards,
Security Team`;
    setEmailContent(exampleEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Email Content Detection
          </h1>
          <p className="text-lg text-gray-600">
            Analyze email content to identify potential phishing attempts
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Paste Email Content
            </label>
            <button
              onClick={loadExample}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Load Example
            </button>
          </div>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste your email content here..."
            rows={8}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200 resize-none"
          ></textarea>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !emailContent.trim()}
              className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
            </button>
            {emailContent && (
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                Clear
              </button>
            )}
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
                      {result.isPhishing
                        ? 'Phishing Email Detected'
                        : 'Email Appears Legitimate'}
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
                    <li>Do not click any links in this email</li>
                    <li>Do not reply or provide any personal information</li>
                    <li>Mark this email as spam or phishing</li>
                    <li>Delete the email immediately</li>
                    <li>Report to your IT security team if work-related</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Red Flags in Phishing Emails:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Urgent or threatening language demanding immediate action</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Requests for passwords, credit cards, or sensitive data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Generic greetings like "Dear Customer" instead of your name</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Poor grammar, spelling errors, or unusual formatting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span>Suspicious sender addresses that don't match the company</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EmailDetection;
