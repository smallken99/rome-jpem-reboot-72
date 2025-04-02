
import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = '#4f46e5',
  height = 8,
  label,
  showPercentage = false,
  className = ''
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);
  
  // Set color based on percentage
  let barColor = color;
  if (!color || color === 'auto') {
    if (percentage >= 80) barColor = '#22c55e'; // Green
    else if (percentage >= 60) barColor = '#84cc16'; // Lime
    else if (percentage >= 40) barColor = '#eab308'; // Yellow
    else if (percentage >= 20) barColor = '#f97316'; // Orange
    else barColor = '#ef4444'; // Red
  }
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor
          }}
        />
      </div>
      {!label && showPercentage && (
        <div className="text-xs text-right mt-1 text-gray-500">
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
