import React from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
type Props = {
  value: number;
};

export const DeltaBadge: React.FC<Props> = ({ value }) => {
  const isPositive = value >= 0;
  const color = isPositive ? 'text-green-500' : 'text-red-500';
  const arrow = isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />;

  return (
    <span className={`flex items-center ${color}`}>
      {arrow} {Math.abs(value).toFixed(1)}%
    </span>
  );
};
