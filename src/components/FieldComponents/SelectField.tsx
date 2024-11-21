import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, required }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <select {...register(name, { required })} className="p-2 border rounded w-full">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500 text-sm">This field is required</p>}
    </div>
  );
};

export default SelectField;
