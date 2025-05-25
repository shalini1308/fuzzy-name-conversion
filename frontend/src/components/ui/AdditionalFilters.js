// components/ui/AdditionalFilters.js
import React from "react";

const AdditionalFilters = ({ additionalFilterOptions, activeAdditionalFilter, onAdditionalFilterChange }) => {
  return (
    <div className="mt-4 space-y-4 bg-indigo-50 p-4 rounded-lg shadow">
      <div>
        <label className="font-medium text-indigo-800">Additional Filter:</label>
        <select
          value={activeAdditionalFilter}
          onChange={(e) => onAdditionalFilterChange(e.target.value)}
          className="ml-2 px-3 py-2 border rounded"
        >
          {additionalFilterOptions.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdditionalFilters;
