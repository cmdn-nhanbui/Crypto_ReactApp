import React from 'react';
import classNames from 'classnames';
import type { SkeletonProps } from '@/core/constants/types';

export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  rounded = true,
  className = '',
}) => {
  return (
    <div className={classNames('bg-gray-300 animate-pulse', width, height, rounded ? 'rounded-md' : '', className)} />
  );
};
