
import React from 'react';
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface ChartProps {
  data: any[];
  type: 'bar' | 'line' | 'pie';
  dataKey?: string;
  nameKey?: string;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type,
  dataKey = 'value',
  nameKey = 'name',
  xAxisDataKey = 'name',
  yAxisDataKey,
  colors = ['#3b82f6', '#ef4444', '#84cc16', '#f59e0b', '#6366f1'],
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  className,
  children
}) => {
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis dataKey={yAxisDataKey} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <Bar dataKey={dataKey}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
            {children}
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis dataKey={yAxisDataKey} />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              activeDot={{ r: 8 }} 
            />
            {children}
          </LineChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedPieLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {children}
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
