import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  required: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type,
  required,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-start">
        <label htmlFor={name} className="text-base font-semibold">
          {label}
          {required && <sup className="text-red-500">*</sup>}
        </label>
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          required={required}
          className="w-60 sm:w-96 border-[1px] font-normal focus:bg-slate-100 hover:bg-slate-100 rounded-sm border-gray-300 p-2 outline-none focus:border-gray-600"
        />
      </div>
    </div>
  );
};

export default FormField;
