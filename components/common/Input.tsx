import React, { InputHTMLAttributes } from 'react';

const Input = ({ id, label, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="text-left">
    <label className="text-gray-700 dark:text-gray-200" htmlFor={id}>
      {label}
      {rest.required ? <span className="text-red-500 ml-2">*</span> : null}
    </label>
    <input
      id={id}
      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
      {...rest}
    />
  </div>
);

export { Input };
