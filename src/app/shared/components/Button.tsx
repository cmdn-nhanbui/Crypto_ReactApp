import classNames from 'classnames';
import type { ButtonProps } from '@/core/constants/types';
import { THEME } from '@/core/constants/theme';

export const Button = ({
  children,
  onClick,
  className,
  color = 'SECONDARY',
  disable = false,
  variant = 'CONTAINED',
}: ButtonProps) => {
  const colorClass = color ? THEME.BUTTON.COLOR[color] : '';
  const variantClass = variant ? THEME.BUTTON.VARIANT[variant] : '';

  const buttonClasses = classNames(
    THEME.BUTTON.BASE,
    variantClass,
    colorClass,
    {
      'cursor-default': disable,
      'cursor-pointer': !disable,
    },
    className,
  );

  return (
    <button disabled={disable} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};
