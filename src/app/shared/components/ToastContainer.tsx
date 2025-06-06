import React from 'react';
import classNames from 'classnames';

import { TOAST_TYPES, type ToastContainerProps } from '@/core/constants/types';
import { Icon } from './Icons';

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className='toast-container'>
      {toasts.map((toast) => {
        return (
          <div key={toast.id} className='toast-item'>
            <div
              className={classNames('check-container', {
                'toast-error': toast.type === TOAST_TYPES.ERROR,
              })}
            >
              <Icon
                icon={toast.type === TOAST_TYPES.SUCCESS ? 'check' : 'x-mark'}
                width={20}
                height={20}
                className='check-icon'
              />
            </div>
            <p className='toast-message'>{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
