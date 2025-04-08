import React, { useEffect, useState } from 'react';
import '../assets/seeData.css';

const formatKey = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
const isArrayOfObjects = (arr) => Array.isArray(arr) && arr.every(item => isObject(item));

const SeeData = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('formEntries')) || [];
    setEntries(saved);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('formEntries');
    setEntries([]);
  };

  return (
      <>
      <h1 className="see-data-title">Saved Submissions</h1>
    <div className="see-data-container">
      {entries.length === 0 ? (
        <p className="see-data-empty">No data saved yet.</p>
      ) : (
        entries.map((entry, idx) => (
          <div key={idx} className="see-data-card">
            <h2 className="see-data-card-title">Entry #{idx + 1}</h2>
            {Object.entries(entry).map(([key, value]) => (
              <div key={key} className="see-data-section">
                <strong>{formatKey(key)}:</strong>
                {isArrayOfObjects(value) ? (
                  <ul className="see-data-list">
                    {value.map((item, index) => (
                      <li key={item.id || index}>
                        <strong>{index + 1}.</strong>
                        <ul className="see-data-sublist">
                          {Object.entries(item).map(([k, v]) =>
                            k === 'id' ? null : (
                              <li key={k}>
                                <span className="see-data-label">{formatKey(k)}:</span> {v || '-'}
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
        ))
      )}
          </div>
      {entries.length > 0 && (
        <button className="see-data-clear-btn" onClick={handleClearAll}>
          Clear All Entries
        </button>
      )}
    </>
  );
};

export default SeeData;
