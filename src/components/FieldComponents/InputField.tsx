import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, required, placeholder }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="p-2 border rounded w-full"
      />
      {errors[name] && <p className="text-red-500 text-sm">This field is required</p>}
    </div>
  );
};

export default InputField;
