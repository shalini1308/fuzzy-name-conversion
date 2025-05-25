import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-sm p-4 bg-white ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`border-b pb-2 mb-2 font-bold text-lg ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);
