import { useState } from "react";

export const useFormSchema = () => {
  const [formSchema, setFormSchema] = useState(null);

  const setSchema = (newSchema: any) => {
    setFormSchema(newSchema);
  };

  return { formSchema, setSchema };
};
