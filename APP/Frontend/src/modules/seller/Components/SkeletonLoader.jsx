import React from 'react';

const SkeletonLoader = ({ height = 'h-32', className = '' }) => (
  <div
    className={`bg-slate-200 rounded-lg animate-pulse ${height} ${className}`}
  />
);

export { SkeletonLoader };