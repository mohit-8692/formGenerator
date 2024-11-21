import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const JSONEditor = ({ schema, setSchema }: { schema: string; setSchema: (value: string) => void }) => {
  const handleChange = (value: string) => setSchema(value);

  return (
    <AceEditor
      mode="json"
      theme="monokai"
      value={schema}
      onChange={handleChange}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      className="w-full h-full"
    />
  );
};

export default JSONEditor;
