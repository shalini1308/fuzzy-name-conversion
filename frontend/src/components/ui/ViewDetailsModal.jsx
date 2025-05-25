import React from "react";
import { Button } from "./Button";

const ViewDetailsModal = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Record Details</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {record.name}</p>
          <p><strong>Gender:</strong> {record.voter_gender === 1 ? "Male" : "Female"}</p>
          <p><strong>Age:</strong> {record.age}</p>
          <p><strong>Case Type:</strong> {record.casetype}</p>
          <p><strong>Case FIR:</strong> {record.casefir}</p>
          <p><strong>Location:</strong> {record.location}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Close
          </Button>
        </div>
      </div>
    </div>
  );  
};

export default ViewDetailsModal;


/*
import React from "react";
import { Button } from "./Button"; // Assuming you have a Button component

const ViewDetailsModal = ({ isOpen, onClose, record }) => {
  if (!isOpen || !record) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Record Details</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {record.name}</p>
          <p><strong>Gender:</strong> {record.voter_gender === 1 ? "Male" : "Female"}</p>
          <p><strong>Age:</strong> {record.age}</p>
          <p><strong>Case Type:</strong> {record.caseType}</p>
          <p><strong>Case FIR:</strong> {record.caseFIR}</p>
          <p><strong>Location:</strong> {record.location}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
*/