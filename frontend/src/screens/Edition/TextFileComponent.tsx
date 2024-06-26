// TextFileComponent.tsx
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { File } from '../../utils/types';

interface TextFileComponentProps {
  file: File;
  onSave: (updatedBase64Content: string) => Promise<void>;
  canEdit: boolean;
}

const TextFileComponent: React.FC<TextFileComponentProps> = ({ file, onSave, canEdit }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const decodedContent = new TextDecoder('utf-8').decode(
      Uint8Array.from(atob(file.content), (c) => c.charCodeAt(0))
    );
    setContent(decodedContent);
  }, [file]);

  const handleSave = async () => {
    if (!canEdit) return;
    const binaryString = new TextEncoder()
      .encode(content)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const updatedBase64Content = btoa(binaryString);
    await onSave(updatedBase64Content);
  };

  return (
    <div>
      <Form>
        <Form.TextArea
          value={content}
          onChange={(e, { value }) =>
            canEdit && typeof value === 'string' ? setContent(value) : undefined
          }
          readOnly={!canEdit}
          style={{ minHeight: 300, width: '100%', height: '73vh', overflowY: 'auto' }}
        />
        {canEdit && (
          <Button onClick={handleSave} primary>
            Zapisz
          </Button>
        )}
      </Form>
    </div>
  );
};

export default TextFileComponent;
