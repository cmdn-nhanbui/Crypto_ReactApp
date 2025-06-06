import React from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { MenuWrapper } from './Menu/MenuWrapper';
import { MenuItem } from './Menu/MenuItem';

interface PerPageSelectorProps {
  perPage: number;
  onChange: (value: number) => void;
  options?: number[];
}

export const PerPageSelector: React.FC<PerPageSelectorProps> = ({ perPage, onChange, options = [50, 100, 300] }) => {
  return (
    <Popover>
      {({ close }) => (
        <>
          <span className='text-xs text-[var(--text-secondary)] mr-2'>Row</span>
          <PopoverButton style={{ outline: 'none' }}>
            <div className='flex items-center'>
              <div className='min-w-20 text-[var(--text-primary)] py-1.5 px-2.5 rounded-lg font-semibold bg-[var(--background-secondary)] cursor-pointer'>
                <span className='mr-2'>{perPage}</span>
                <CaretDownOutlined />
              </div>
            </div>
          </PopoverButton>

          <PopoverPanel transition anchor='bottom end'>
            <MenuWrapper>
              {options.map((item) => (
                <MenuItem
                  onClick={() => {
                    onChange(item);
                    close();
                  }}
                  key={item}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuWrapper>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
