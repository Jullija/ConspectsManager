import { Grid, Segment } from 'semantic-ui-react';
import { PermissionTypeEditable, File } from '../../utils/types';
import MarkdownFile from './MarkdownFile';
import TextFileComponent from './TextFileComponent';
import { axiosClient } from '../../api/axiosClient';

interface FileContentViewProps {
  selectedFile: File;
  onChange: () => void;
}

const editablePermissions: PermissionTypeEditable[] = ['owns', 'edit', 'admin'];

const FileContentView = ({ selectedFile }: FileContentViewProps): JSX.Element => {
  const handleSave = async (updatedBase64Content: string) => {
    try {
      await axiosClient.patch(
        `/files/${selectedFile?.id}/`,
        {
          name: selectedFile?.name,
          extension: selectedFile?.extension,
          content: updatedBase64Content
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('File saved successfully.');
    } catch (error) {
      console.error('Failed to save the file:', error);
    }
  };
  const renderFileContent = () => {
    if (!selectedFile) {
      return <p>Nie wybrano pliku.</p>;
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
            PDF nie może zostać wyświetlony, pobierz go
            <a href={pdfDataUrl} download={`${selectedFile.name}.pdf`}>
              tutaj
            </a>
            .
          </object>
        );
      }
      default:
        return (
          <p>
            Typ pliku nie jest wspierany.{' '}
            <a href={`data:text/plain;base64,${selectedFile.content}`} download={selectedFile.name}>
              Pobierz plik
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
            {selectedFile ? (
              renderFileContent()
            ) : (
              <p>Wybierz plik, żeby zobaczyć jego zawartość.</p>
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FileContentView;
