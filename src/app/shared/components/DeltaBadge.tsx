import React from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import type { DeltaBadgeProps } from '@/core/constants/types';

export const DeltaBadge: React.FC<DeltaBadgeProps> = ({ value, className }) => {
  const isPositive = value >= 0;
  const color = isPositive ? 'text-green-500' : 'text-red-500';
  const arrow = isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />;

  return (
    <span className={`flex items-center ${color} ${className}`}>
      {arrow} {Math.abs(value).toFixed(1)}%
    </span>
  );
};
