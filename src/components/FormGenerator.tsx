import { useForm, SubmitHandler } from 'react-hook-form';
import { FormSchema } from '../types/formSchema';

const FormGenerator = ({ schema }: { schema: FormSchema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-lg font-bold">{schema.formTitle}</h1>
      <p className="text-sm">{schema.formDescription}</p>
      {schema.fields.map((field) => (
        <div key={field.id}>
          <label className="block font-medium">{field.label}</label>
          {field.type === 'text' || field.type === 'email' ? (
            <input
              {...register(field.id, { required: field.required })}
              type={field.type}
              placeholder={field.placeholder}
              className="border p-2 w-full"
            />
          ) : field.type === 'select' ? (
            <select {...register(field.id, { required: field.required })} className="border p-2 w-full">
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea {...register(field.id)} placeholder={field.placeholder} className="border p-2 w-full" />
          ) : null}
          {errors[field.id] && <p className="text-red-500 text-sm">This field is required.</p>}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default FormGenerator;
