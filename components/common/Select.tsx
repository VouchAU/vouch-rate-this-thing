import React, { HTMLProps, InputHTMLAttributes } from 'react';

interface SelectOption {
  id?: string | number;
  label: string;
  value: any;
}

interface Props extends HTMLProps<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

const Select = ({ id, label, value, options, ...rest }: Props) => (
  <div className="text-left relative">
    <label className="text-gray-700 dark:text-gray-200" htmlFor={id}>
      {label}
      {rest.required ? <span className="text-red-500 ml-2">*</span> : null}
    </label>
    <select
      id={id}
      className="
          form-select
          appearance-none
          block
          w-full
          px-3
          py-2
          mt-2
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      aria-label="Default select example"
      {...rest}
    >
      {options.map((option) => {
        return (
          <option id={`${option.id}`} key={option.id} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>

    <span className="absolute right-4 top-10 pointer-events-none text-gray-400">↓</span>
  </div>
);

export { Select };
