function Awareness() {
  const phishingTypes = [
    {
      title: 'Email Phishing',
      description:
        'The most common type where attackers send fraudulent emails pretending to be from legitimate organizations.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: 'Spear Phishing',
      description:
        'Targeted attacks aimed at specific individuals or organizations using personalized information.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Smishing (SMS)',
      description:
        'Phishing attempts via text messages, often containing malicious links or requesting personal data.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: 'Vishing (Voice)',
      description:
        'Phone-based scams where attackers pose as legitimate entities to extract sensitive information.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  const warningSigns = [
    {
      title: 'Suspicious Sender',
      description: 'Email addresses that mimic legitimate companies with slight variations',
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'Urgent Language',
      description: 'Messages creating panic or pressure to act immediately',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Poor Grammar',
      description: 'Spelling mistakes and grammatical errors in professional communications',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Suspicious Links',
      description: 'Hover over links to see if URLs match the claimed destination',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Request for Info',
      description: 'Asking for passwords, credit cards, or sensitive personal data',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Too Good to Be True',
      description: 'Unrealistic offers, prizes, or refunds you did not expect',
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  const protectionTips = [
    {
      title: 'Verify Before Clicking',
      description: 'Always verify the sender and hover over links before clicking them',
      icon: '🔍',
    },
    {
      title: 'Enable 2FA',
      description: 'Use two-factor authentication on all important accounts',
      icon: '🔐',
    },
    {
      title: 'Keep Software Updated',
      description: 'Regular updates patch security vulnerabilities',
      icon: '🔄',
    },
    {
      title: 'Use Strong Passwords',
      description: 'Create unique, complex passwords for each account',
      icon: '🔑',
    },
    {
      title: 'Be Skeptical',
      description: 'Question unexpected emails, especially those requesting action',
      icon: '🤔',
    },
    {
      title: 'Report Suspicious Activity',
      description: 'Report phishing attempts to IT security teams',
      icon: '📢',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Phishing Awareness & Education
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about phishing attacks and how to protect yourself from cyber threats
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What is Phishing?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Phishing is a type of cyber attack where criminals impersonate legitimate
                organizations or individuals to trick you into revealing sensitive
                information such as passwords, credit card numbers, or personal data.
              </p>
              <p className="mb-4">
                These attacks typically arrive via email, text message, or phone call and
                often create a sense of urgency to make you act without thinking.
                Attackers use sophisticated techniques to make their messages appear
                authentic, including copying logos, formatting, and language from real
                companies.
              </p>
              <p>
                Understanding how phishing works is your first line of defense against
                these attacks.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Types of Phishing Attacks
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {phishingTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Warning Signs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warningSigns.map((sign, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${sign.color} font-semibold mb-3`}
                >
                  {sign.title}
                </div>
                <p className="text-gray-600">{sign.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Protect Yourself
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protectionTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Vigilant, Stay Safe</h2>
            <p className="text-lg mb-6 opacity-90">
              Remember: Legitimate organizations will never ask for sensitive information
              via email or text. When in doubt, contact the company directly using
              official channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg bg-purple-300 bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Think</div>
                <div className="text-sm opacity-90">Before you click</div>
              </div>
              <div className="bg bg-purple-300 bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Verify</div>
                <div className="text-sm opacity-90">The source</div>
              </div>
              <div className="bg bg-purple-300 bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">Report</div>
                <div className="text-sm opacity-90">Suspicious activity</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Awareness;
