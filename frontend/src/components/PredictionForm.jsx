import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Droplet, User, Scale, Microscope,
    Baby, Calculator, Heart, ArrowRight, Loader2, AlertCircle
} from 'lucide-react';

const InputField = ({ label, name, value, onChange, min, max, step, Icon, description }) => (
    <motion.div
        className="input-card"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <div className="input-header">
            <div className="icon-box">
                <Icon size={18} color="#7c3aed" />
            </div>
            <label className="label-text" htmlFor={name}>{label}</label>
        </div>

        <div className="input-control">
            <input
                className="styled-input"
                type="number"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                required
            />
            {max && (
                <div style={{ marginTop: '1.25rem' }}>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step || 1}
                        value={value}
                        onChange={onChange}
                        name={name}
                        className="range-slider"
                    />
                </div>
            )}
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.75rem', marginHeight: 0 }}>{description}</p>
        </div>
    </motion.div>
);

const PredictionForm = ({ onPredict }) => {
    const [formData, setFormData] = useState({
        Pregnancies: 0,
        Glucose: 100,
        BloodPressure: 72,
        SkinThickness: 20,
        Insulin: 0,
        BMI: 30.0,
        DiabetesPedigreeFunction: 0.50,
        Age: 30
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            API_URL = API_URL.replace(/\/$/, '');

            const response = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Prediction failed');
            const result = await response.json();

            setTimeout(() => onPredict(result), 800);
        } catch (err) {
            console.error(err);
            setError("Unable to connect to the AI engine. Please ensure the backend server is active.");
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card"
            style={{ width: '100%', maxWidth: '1000px' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div className="icon-box" style={{ width: '40px', height: '40px', display: 'inline-flex', marginBottom: '1.5rem', background: '#f5f3ff' }}>
                    <Activity size={32} color="#7c3aed" />
                </div>
                <h2 style={{ marginBottom: '0.75rem' }}>Patient Health Profile</h2>
                <p style={{ maxWidth: '500px', margin: '0 auto', color: '#64748b' }}>Provide the clinical parameters below to generate a real-time risk assessment.</p>
            </div>

            {error && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    style={{
                        background: '#fff1f2',
                        color: '#e11d48',
                        padding: '1.25rem',
                        borderRadius: '16px',
                        marginBottom: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        border: '1px solid #ffe4e6',
                        textAlign: 'left'
                    }}
                >
                    <AlertCircle size={24} />
                    <span style={{ fontWeight: 500 }}>{error}</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <InputField
                        label="Pregnancies"
                        name="Pregnancies"
                        value={formData.Pregnancies}
                        onChange={handleChange}
                        min="0" max="20"
                        Icon={Baby}
                        description="Number of past pregnancies"
                    />
                    <InputField
                        label="Glucose (mg/dL)"
                        name="Glucose"
                        value={formData.Glucose}
                        onChange={handleChange}
                        min="0" max="300"
                        Icon={Droplet}
                        description="Plasma glucose concentration"
                    />
                    <InputField
                        label="Blood Pressure"
                        name="BloodPressure"
                        value={formData.BloodPressure}
                        onChange={handleChange}
                        min="0" max="200"
                        Icon={Heart}
                        description="Diastolic blood pressure (mm Hg)"
                    />
                    <InputField
                        label="Skin Thickness"
                        name="SkinThickness"
                        value={formData.SkinThickness}
                        onChange={handleChange}
                        min="0" max="100"
                        Icon={User}
                        description="Triceps skin fold thickness (mm)"
                    />
                    <InputField
                        label="Insulin (mu U/ml)"
                        name="Insulin"
                        value={formData.Insulin}
                        onChange={handleChange}
                        min="0" max="900"
                        Icon={Microscope}
                        description="2-Hour serum insulin level"
                    />
                    <InputField
                        label="Body Mass Index"
                        name="BMI"
                        value={formData.BMI}
                        onChange={handleChange}
                        min="0" max="70" step="0.1"
                        Icon={Scale}
                        description="Weight to height ratio (kg/m²)"
                    />
                    <InputField
                        label="Genetics Scale"
                        name="DiabetesPedigreeFunction"
                        value={formData.DiabetesPedigreeFunction}
                        onChange={handleChange}
                        min="0" max="3" step="0.01"
                        Icon={Calculator}
                        description="Diabetes pedigree function score"
                    />
                    <InputField
                        label="Patient Age"
                        name="Age"
                        value={formData.Age}
                        onChange={handleChange}
                        min="0" max="120"
                        Icon={User}
                        description="Age of the patient in years"
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <motion.button
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        style={{ minWidth: '280px', height: '60px' }}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={24} /> Processing Data...
                            </>
                        ) : (
                            <>
                                Run AI Diagnosis <ArrowRight size={22} />
                            </>
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default PredictionForm;
