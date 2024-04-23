import React, { useState, useEffect } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { File } from '../../utils/types';
import getToken from '../../utils/tokenManager';
import debounce from 'lodash.debounce';

import { axiosClient } from '../../api/axiosClient';
interface MarkdownFileProps {
  file: File;
  onSave: (updatedBase64Content: string) => Promise<void>;
  canEdit: boolean;
}

const MarkdownFile: React.FC<MarkdownFileProps> = ({ file, onSave, canEdit }) => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const decodedContent = new TextDecoder('utf-8').decode(
      Uint8Array.from(atob(file.content), (c) => c.charCodeAt(0))
    );
    setContent(decodedContent);
  }, [file]);

  const fetchMarkdownPreview = debounce(async () => {
    try {
      const response = await axiosClient.get(`/files/${file.id}/html_markdown/`);

      const html = response.data; // Axios stores the response data directly in the 'data' property.
      setPreview(html);
    } catch (error) {
      console.error('Error fetching markdown preview:', error);
      setPreview('Error fetching markdown preview.');
    }
  }, 500);

  useEffect(() => {
    fetchMarkdownPreview();
    return () => fetchMarkdownPreview.cancel();
  }, [content]);

  const handleContentChange = (value: string) => {
    if (canEdit) {
      setContent(value);
      debouncedSave(value);
    }
  };

  const debouncedSave = debounce(async (value: string) => {
    const binaryString = new TextEncoder()
      .encode(value)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const updatedBase64Content = btoa(binaryString);
    await onSave(updatedBase64Content);
  }, 500);

  useEffect(() => {
    return () => debouncedSave.cancel();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Form>
            <Form.TextArea
              value={content}
              onChange={(e, { value }) => typeof value === 'string' && handleContentChange(value)}
              readOnly={!canEdit}
              style={{ minHeight: 300, height: '78vh', overflowY: 'auto' }}
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment style={{ minHeight: 300, height: '78vh', overflowY: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default MarkdownFile;
