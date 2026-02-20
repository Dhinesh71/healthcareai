import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ShieldCheck, Zap, ArrowRight, HeartPulse } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="landing-container"
      style={{ overflow: 'hidden', width: '100%', paddingBottom: '4rem' }}
      ref={containerRef}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '4rem', position: 'relative', width: '100%' }}
      >
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', opacity: 0.05, zIndex: -1 }}>
          <HeartPulse size={400} color="#8b5cf6" />
        </div>

        <h1>
          Predicting Health.<br />
          <span style={{ color: '#0f172a' }}>Protecting Futures.</span>
        </h1>

        <p className="hero-text" style={{ marginBottom: '2.5rem' }}>
          Harness the power of AI to assess your diabetes risk instantly.
          Early detection is the first step towards a healthier life.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          onClick={onStart}
        >
          Start Assessment <ArrowRight size={22} />
        </motion.button>
      </motion.div>

      {/* Features Grid */}
      <div className="features-grid">
        {[
          { icon: Zap, title: "Instant Analysis", desc: "Get results in seconds powered by advanced Random Forest algorithms." },
          { icon: Activity, title: "Precision AI", desc: "Trained on thousands of clinical records for high accuracy." },
          { icon: ShieldCheck, title: "Privacy First", desc: "Your health data is processed in real-time and never stored." }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ y: -10, boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)' }}
          >
            <div className="icon-box" style={{ width: '50px', height: '50px', marginBottom: '1.5rem' }}>
              <feature.icon size={26} color="#7c3aed" />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>{feature.title}</h3>
            <p style={{ fontSize: '1rem', color: '#64748b', margin: 0 }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LandingPage;
