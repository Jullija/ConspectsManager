import { Grid, Segment } from 'semantic-ui-react';
import { PermissionTypeEditable, File } from '../../utils/types';
import MarkdownFile from './MarkdownFile';
import TextFileComponent from './TextFileComponent';
import getToken from '../../utils/tokenManager';

interface FileContentViewProps {
  selectedFile: File;
  onChange: () => void;
}

const editablePermissions: PermissionTypeEditable[] = ['owns', 'edit', 'admin'];

const FileContentView = ({ selectedFile }: FileContentViewProps): JSX.Element => {
  const handleSave = async (updatedBase64Content: string) => {
    try {
      const token = getToken();

      const response = await fetch(`http://localhost:8000/files/${selectedFile?.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          name: selectedFile?.name,
          extension: selectedFile?.extension,
          content: updatedBase64Content
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('File saved successfully.');
    } catch (error) {
      console.error('Failed to save the file:', error);
    }
  };
  const renderFileContent = () => {
    if (!selectedFile) {
      return <p>No file selected.</p>;
    }

    switch (selectedFile.extension) {
      case 'txt':
        return (
          <TextFileComponent
            file={selectedFile}
            onSave={handleSave}
            canEdit={editablePermissions.includes(
              selectedFile.user_permission as PermissionTypeEditable
            )}
          />
        );

      case 'md':
        return (
          <MarkdownFile
            file={selectedFile}
            onSave={handleSave}
            canEdit={editablePermissions.includes(
              selectedFile.user_permission as PermissionTypeEditable
            )}
          />
        );
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
        return (
          <img
            src={`data:image/${selectedFile.extension};base64,${selectedFile.content}`}
            alt={selectedFile.name}
            style={{ maxWidth: '100%' }}
          />
        );
      case 'mp4':
        return (
          <video
            src={`data:video/${selectedFile.extension};base64,${selectedFile.content}`}
            controls
            style={{ maxWidth: '100%' }}
          />
        );
      case 'pdf': {
        const pdfDataUrl = `data:application/pdf;base64,${selectedFile.content}`;
        return (
          <object
            data={pdfDataUrl}
            type="application/pdf"
            width="100%"
            style={{ minHeight: '500px', height: '77vh' }}>
            PDF cannot be displayed, download it
            <a href={pdfDataUrl} download={`${selectedFile.name}.pdf`}>
              here
            </a>
            .
          </object>
        );
      }
      default:
        return (
          <p>
            Unsupported file type.{' '}
            <a href={`data:text/plain;base64,${selectedFile.content}`} download={selectedFile.name}>
              Download file
            </a>
          </p>
        );
    }
  };

  return (
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment>
            {selectedFile ? renderFileContent() : <p>Select a file to view its content.</p>}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FileContentView;
