import React from "react";
import { useFormContext } from "react-hook-form";

interface RadioGroupFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required: boolean;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ label, name, options, required }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.value}
              {...register(name, { required })}
              className="form-radio"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {errors[name] && <p className="text-red-500 text-sm">This field is required</p>}
    </div>
  );
};

export default RadioGroupField;
