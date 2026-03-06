import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WebsiteDetection from './pages/WebsiteDetection';
import EmailDetection from './pages/EmailDetection';
import Awareness from './pages/Awareness';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'website':
        return <WebsiteDetection />;
      case 'email':
        return <EmailDetection />;
      case 'awareness':
        return <Awareness />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            PhishGuard - Protecting you from phishing attacks
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Stay safe online. Always verify before you trust.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
