import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/formRenderer.css'; // Import the new CSS file

const FormRenderer = ({ schema, step, setStep, onSubmit, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRepeatableChange = (sectionName, index, fieldName, value) => {
    const updated = [...formData[sectionName]];
    updated[index][fieldName] = value;
    setFormData(prev => ({ ...prev, [sectionName]: updated }));
  };

  const handleAddAnother = (name, fields) => {
    const newItem = {
      ...Object.fromEntries(fields.map(f => [f.name, ''])),
      id: uuidv4(),
    };
    setFormData(prev => ({
      ...prev,
      [name]: [...(prev[name] || []), newItem],
    }));
  };

  const validateStep = () => {
    const currentStep = schema[step];
    const newErrors = {};
    currentStep.fields.forEach((field) => {
      if (field.required) {
        if (field.type === 'repeatable') {
          (formData[field.name] || []).forEach((item, i) => {
            field.fields.forEach(subField => {
              if (subField.required && !item[subField.name]) {
                newErrors[`${field.name}-${i}-${subField.name}`] = 'Required';
              }
            });
          });
        } else if (!formData[field.name]) {
          newErrors[field.name] = 'Required';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
    else alert('Please fill all required fields.');
  };

  const handleBack = () => setStep(step - 1);

  const currentStep = schema[step];
  if (!currentStep) return null;

  return (
    <div className="form-container">
      <h2 className="form-title">{currentStep.title}</h2>
      <p className="form-progress">Step {step + 1} of {schema.length}</p>

      {currentStep.fields.map((field) => {
        if (field.type === 'repeatable') {
          return (
            <div key={field.name}>
              <label className="form-label">{field.label}</label>
              {formData[field.name]?.map((item, index) => (
                <div key={item.id} className="repeatable-section">
                  {field.fields.map((subField) => (
                    <div key={subField.name}>
                      <label className="field-label">{subField.label}</label>
                      <input
                        type={subField.type}
                        className="field-input"
                        value={item[subField.name] || ''}
                        onChange={(e) =>
                          handleRepeatableChange(field.name, index, subField.name, e.target.value)
                        }
                      />
                      {errors[`${field.name}-${index}-${subField.name}`] && (
                        <span className="error-text">Required</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddAnother(field.name, field.fields)}
                className="add-button"
              >
                Add Another
              </button>
            </div>
          );
        }

        if (field.type === 'radio') {
          return (
            <div key={field.name}>
              <label className="form-label">{field.label}</label>
              {field.options.map((opt) => (
                <label key={opt} className="radio-option">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    checked={formData[field.name] === opt}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                  {opt}
                </label>
              ))}
              {errors[field.name] && <p className="error-text">Required</p>}
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.name}>
              <label className="form-label">{field.label}</label>
              <select
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="field-select"
              >
                <option value="">Select</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors[field.name] && <p className="error-text">Required</p>}
            </div>
          );
        }

        if (field.type === 'checkbox') {
          return (
            <div key={field.name} className="checkbox-field">
              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
              <label>{field.label}</label>
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="field-input"
            />
            {errors[field.name] && <p className="error-text">Required</p>}
          </div>
        );
      })}

      <div className="navigation-buttons">
        {step > 0 && (
          <button onClick={handleBack} className="btn back-btn">
            Back
          </button>
        )}
        {step < schema.length - 1 ? (
          <button onClick={handleNext} className="btn next-btn">
            Next
          </button>
        ) : (
          <button onClick={onSubmit} className="btn submit-btn">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default FormRenderer;
