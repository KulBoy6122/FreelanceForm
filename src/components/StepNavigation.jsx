import React from 'react';

const StepNavigator = ({ step, totalSteps, onBack, onNext, isLastStep, onSubmit }) => (
  <div className="flex justify-between mt-6">
    <button onClick={onBack} disabled={step === 0} className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">Back</button>
    {isLastStep ? (
      <button onClick={onSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
    ) : (
      <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
    )}
  </div>
);

export default StepNavigator;