import { HTMLProps, MouseEventHandler } from 'react';

type Props = HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary' | 'ghost';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button: React.FunctionComponent<Props> = ({ children, onClick, variant, type, ...rest }) => (
  <button
    className={
      variant === 'primary'
        ? 'bg-blue-600 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        : variant === 'secondary'
        ? 'bg-white text-blue-600 active:bg-gray-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        : 'text-blue-600 dark:text-blue-400 hover:underline'
    }
    type={type ?? 'button'}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

export { Button };
