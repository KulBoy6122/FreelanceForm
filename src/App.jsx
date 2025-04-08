import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userProfile from './schema/userProfile';
import education from './schema/education';
import experience from './schema/experience';
import FormRenderer from './components/FormRenderer';
import DataPreview from './components/DataPreview';
import SeeData from './components/seeData'; // NEW component
import { v4 as uuidv4 } from 'uuid';

const steps = [userProfile, education, experience];

function FormFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const buildInitialData = () => {
    const initialData = {};
    steps.forEach(stepSchema => {
      stepSchema.fields.forEach(field => {
        if (field.type === 'repeatable') {
          initialData[field.name] = [
            {
              ...Object.fromEntries(field.fields.map(f => [f.name, ''])),
              id: uuidv4(),
            },
          ];
        } else {
          initialData[field.name] = field.type === 'checkbox' ? false : '';
        }
      });
    });
    return initialData;
  };

  useEffect(() => {
    setFormData(buildInitialData());
  }, []);

  const handleReset = () => {
    setFormData(buildInitialData());
    setStep(0);
    setSubmitted(false);
  };

  const handleSaveToLocalStorage = () => {
    const stored = JSON.parse(localStorage.getItem('formEntries')) || [];
    localStorage.setItem('formEntries', JSON.stringify([...stored, formData]));
    handleReset();
  };

  if (submitted) {
    return (
      <DataPreview
        formData={formData}
        onClose={() => setSubmitted(false)}
        onSave={handleSaveToLocalStorage}
      />
    );
  }

  return (
    <div className="app-container">
      <FormRenderer
        schema={steps}
        step={step}
        setStep={setStep}
        onSubmit={() => setSubmitted(true)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormFlow />} />
        <Route path="/seeData" element={<SeeData />} />
      </Routes>
    </Router>
  );
}
