import React from 'react';
import '../assets/dataPreview.css';

const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
const isArrayOfObjects = (arr) => Array.isArray(arr) && arr.every(item => isObject(item));

const formatKey = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

const DataPreview = ({ formData, onClose, onSave }) => {
  return (
    <div className="preview-overlay">
      <div className="preview-modal">
        <h2 className="preview-title">Preview Submitted Data</h2>
        <div className="preview-data">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="preview-section">
              <strong>{formatKey(key)}:</strong>
              {isArrayOfObjects(value) ? (
                <ul className="preview-list">
                  {value.map((item, index) => (
                    <li key={item.id || index}>
                      <strong>{index + 1}.</strong>
                      <ul className="preview-sublist">
                        {Object.entries(item).map(([k, v]) =>
                          k === 'id' ? null : (
                            <li key={k}>
                              <span className="preview-label">{formatKey(k)}:</span> {v || '-'}
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : typeof value === 'boolean' ? (
                <span> {value ? 'Yes' : 'No'}</span>
              ) : (
                <span> {value || '-'}</span>
              )}
            </div>
          ))}
        </div>

        <div className="preview-actions">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
          <button className="save-btn" onClick={onSave}>
            Save & New Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPreview;
