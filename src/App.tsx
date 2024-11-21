import { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import FormGenerator from './components/FormGenerator';
import { FormSchema } from './types/formSchema';

const App = () => {
  const [schema, setSchema] = useState<string>(JSON.stringify({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      }
    ]
  }, null, 2));

  const handleSchemaChange = (newSchema: string) => {
    try {
      JSON.parse(newSchema);
      setSchema(newSchema);
    } catch {
      // Handle JSON errors
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="p-4 border-r">
        <JSONEditor schema={schema} setSchema={handleSchemaChange} />
      </div>
      <div className="p-4">
        <FormGenerator schema={JSON.parse(schema) as FormSchema} />
      </div>
    </div>
  );
};

export default App;
