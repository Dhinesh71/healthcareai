import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import LandingPage from './components/LandingPage';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setCurrentPage('predict');
  };

  const handlePredict = (data) => {
    setResult(data);
    setCurrentPage('result');
  };

  const handleReset = () => {
    setResult(null);
    setCurrentPage('landing');
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="navbar-glass"
      >
        <div className="nav-content">
          <div
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onClick={() => setCurrentPage('landing')}
          >
            <div style={{
              background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
              padding: '0.5rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={24} color="#7c3aed" />
            </div>
            <span style={{
              fontWeight: 800,
              fontSize: '1.5rem',
              background: 'linear-gradient(45deg, #8b5cf6, #d946ef)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              DiaPredict
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span className="desktop-only" style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
              AI-Powered MedTech
            </span>
          </div>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="main-container">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <LandingPage onStart={handleStart} />
            </motion.div>
          )}

          {currentPage === 'predict' && (
            <motion.div
              key="predict"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <PredictionForm onPredict={handlePredict} />
            </motion.div>
          )}

          {currentPage === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              <ResultDisplay result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        color: '#94a3b8',
        fontSize: '0.9rem',
        marginTop: 'auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          &copy; {new Date().getFullYear()} DiaPredict MedTech AI. All rights reserved. <br />
          <p style={{ fontSize: '0.75rem', marginTop: '1rem', opacity: 0.8 }}>
            Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice.
            The AI predictions are based on statistical patterns and should be verified by a licensed healthcare professional.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
