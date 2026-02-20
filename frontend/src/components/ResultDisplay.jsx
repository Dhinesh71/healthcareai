import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, RefreshCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const CircularProgress = ({ value, color }) => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg className="circular-chart" viewBox="0 0 200 200" width="200" height="200">
            <circle
                className="circle-bg"
                cx="100" cy="100" r={radius}
            />
            <motion.circle
                className="circle"
                stroke={color}
                cx="100" cy="100" r={radius}
                strokeDasharray={`${circumference} ${circumference}`}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                transform="rotate(-90 100 100)"
            />
            <text x="100" y="105" textAnchor="middle" className="percentage" style={{ fontSize: '3rem', fill: '#1e293b' }}>{(value).toFixed(1)}%</text>
            <text x="100" y="130" textAnchor="middle" className="risk-label-svg" style={{ fontSize: '0.8rem', fill: '#64748b' }}>PROBABILITY</text>
        </svg>
    );
};

const ResultDisplay = ({ result, onReset }) => {
    const { prediction, probability, risk_level, feature_importance } = result;
    const probPercentage = probability * 100;

    // Determine theme based on risk (Matching backend strings "High Risk" / "Low Risk")
    const isHighRisk = risk_level === "High Risk";

    // We can also use probability for more granular color
    const themeColor = probPercentage > 70 ? "#e11d48" : probPercentage > 30 ? "#f59e0b" : "#10b981";
    const Icon = probPercentage > 70 ? AlertTriangle : probPercentage > 30 ? Info : CheckCircle;

    // Sort features
    const sortedFeatures = feature_importance
        ? Object.entries(feature_importance).sort(([, a], [, b]) => b - a)
        : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ width: '100%', maxWidth: '850px' }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                    display: 'inline-flex',
                    padding: '1.25rem',
                    borderRadius: '20px',
                    background: `${themeColor}15`,
                    color: themeColor,
                    marginBottom: '1.5rem'
                }}
            >
                <Icon size={40} />
            </motion.div>

            <h2 style={{ marginBottom: '0.5rem' }}>Analysis Results</h2>
            <p style={{ color: '#64748b', marginBottom: '3rem' }}>
                AI Model cross-referenced your health parameters with thousands of clinical records.
            </p>

            <div className="results-container">
                <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                    <CircularProgress value={probPercentage} color={themeColor} />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.2rem', margin: '0 0 1rem', color: themeColor, fontWeight: 800 }}>
                        {risk_level}
                    </h3>

                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        maxWidth: '500px'
                    }}>
                        <p style={{ margin: 0, color: '#334155', fontWeight: 500, fontSize: '1rem', lineHeight: 1.6 }}>
                            {prediction === 1
                                ? "The AI engine has identified patterns strongly associated with diabetes risk. We strongly recommend scheduling a diagnostic test with a healthcare professional."
                                : "The analysis suggests your physiological parameters fall within the low-risk category. Continue maintaining a balanced diet and regular exercise."}
                        </p>
                    </div>
                </div>
            </div>

            {sortedFeatures.length > 0 && (
                <div className="importance-grid" style={{ marginTop: '5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '0.75rem' }}>
                        <div className="icon-box" style={{ background: '#f8fafc', padding: '0.5rem' }}>
                            <Activity size={20} color="#64748b" />
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>AI Decision Factors</h4>
                    </div>

                    {sortedFeatures.map(([name, value], index, array) => {
                        const maxVal = Math.max(...array.map(f => f[1]));
                        const widthPercent = (value / maxVal) * 100;

                        return (
                            <div key={name} className="feature-bar-row">
                                <div className="feature-bar-label">
                                    <span>{name}</span>
                                    <span style={{ fontWeight: 700, color: '#1e293b' }}>
                                        {(value * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="feature-bar-container">
                                    <motion.div
                                        className="feature-bar-progress"
                                        style={{ background: themeColor }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${widthPercent}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <motion.button
                className="btn-primary"
                onClick={onReset}
                style={{ marginTop: '4rem', background: '#475569', width: '100%', maxWidth: '300px' }}
                whileHover={{ scale: 1.02, background: '#1e293b' }}
                whileTap={{ scale: 0.98 }}
            >
                <RefreshCcw size={20} /> New Assessment
            </motion.button>
        </motion.div>
    );
};

export default ResultDisplay;
