import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const JSONEditor = ({ schema, setSchema }: { schema: string; setSchema: (value: string) => void }) => {
  const handleChange = (value: string) => setSchema(value);

  const parseSchema = (schema) => {
    try {
      return JSON.parse(schema);
    } catch (e) {
      return [];
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'email':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <input type="email" name={field.id} placeholder={field.placeholder} required={field.required} />
          </div>
        );
      case 'select':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <select name={field.id} required={field.required}>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'radio':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option) => (
              <div key={option.value}>
                <input type="radio" name={field.id} value={option.value} id={option.value} required={field.required} />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        );
      case 'textarea':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <textarea name={field.id} placeholder={field.placeholder} required={field.required}></textarea>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEditorChange = (value) => {
    setSchema(value);
  };

  const fields = parseSchema(schema);

  return (
    <div className="flex">
      <div className="w-1/2">
        <AceEditor
          mode="json"
          theme="monokai"
          value={schema}
          onChange={handleEditorChange}
          name="json-editor"
          editorProps={{ $blockScrolling: true }}
          className="w-full h-full"
        />
      </div>
      <div className="w-1/2 p-4">
        <form>
          {fields.map((field) => renderField(field))}
        </form>
      </div>
    </div>
  );
};

export default JSONEditor;
