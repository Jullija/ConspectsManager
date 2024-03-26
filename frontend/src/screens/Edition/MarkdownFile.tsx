import React, { useState, useEffect } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { File } from '../../utils/types';

interface MarkdownFileProps {
  file: File;
  onSave: (updatedBase64Content: string) => Promise<void>;
}

const TextFileComponent: React.FC<MarkdownFileProps> = ({ file, onSave }) => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  useEffect(() => {
    const decodedContent = new TextDecoder('utf-8').decode(
      Uint8Array.from(atob(file.content), (c) => c.charCodeAt(0))
    );
    setContent(decodedContent);
  }, [file]);

  useEffect(() => {
    // Whenever the content changes, fetch a new preview
    fetchMarkdownPreview();
  }, [content]);

  const fetchMarkdownPreview = async () => {
    try {
      const response = await fetch(`http://localhost:8000/files/${file.id}/html_markdown/`);
      if (response.ok) {
        const html = await response.text();
        setPreview(html);
      } else {
        console.error('Failed to fetch markdown preview:', response.status);
        setPreview('Failed to fetch markdown preview.');
      }
    } catch (error) {
      console.error('Error fetching markdown preview:', error);
      setPreview('Error fetching markdown preview.');
    }
  };

  const handleSave = async () => {
    const binaryString = new TextEncoder()
      .encode(content)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const updatedBase64Content = btoa(binaryString);
    await onSave(updatedBase64Content);
    await fetchMarkdownPreview();
  };

  return (
    <div>
      <Form>
        <Form.TextArea
          value={content}
          onChange={(e, { value }) =>
            typeof value === 'string' ? setContent(value) : setContent('')
          }
          style={{ minHeight: 300, width: '100%' }}
        />
        <Button onClick={handleSave} primary>
          Save
        </Button>
      </Form>
      <Segment style={{ minHeight: 300, width: '100%', marginTop: '1em' }}>
        <div
          dangerouslySetInnerHTML={{ __html: preview }}
          style={{ overflowY: 'auto', maxHeight: '300px' }}
        />
      </Segment>
    </div>
  );
};

export default TextFileComponent;
