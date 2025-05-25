import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button
    className={`bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);
