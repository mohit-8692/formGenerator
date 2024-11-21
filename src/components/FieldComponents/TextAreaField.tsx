import React from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaFieldProps {
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, required, placeholder }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <textarea
        placeholder={placeholder}
        {...register(name, { required })}
        className="p-2 border rounded w-full"
      />
      {errors[name] && <p className="text-red-500 text-sm">This field is required</p>}
    </div>
  );
};

export default TextAreaField;
