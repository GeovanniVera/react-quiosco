// src/components/Input.jsx
import { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label = 'Label Name',
      type = 'text',
      name,
      id,
      placeholder = '',
      autoFocus = false,
      required = false,
      className = '',
      containerClassName = '',
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col mb-4 ${containerClassName}`}>
        <label htmlFor={id} className="text-gray-500 font-medium mb-2">
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          className={`py-2 px-4 rounded-xl border border-gray-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 transition-all outline-none ${className}`}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;