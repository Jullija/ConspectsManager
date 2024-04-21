import React, { useState } from 'react';
import { useFile } from '../../context/FileContext';
import TextFileComponent from './TextFileComponent';
import MarkdownFile from './MarkdownFile';
import { Accordion, Icon, Grid, Segment } from 'semantic-ui-react';
import getToken from '../../utils/tokenManager';
import { PermissionType, PermissionTypeEditable } from '../../utils/types';


interface ContentViewProps {
  subjectId: number;
  edition?: { id: number; name: string };
}

const viewablePermissions: PermissionType[] = ['view', 'owns', 'edit', 'admin'];
const editablePermissions: PermissionTypeEditable[] = ['owns', 'edit', 'admin'];

const ContentView: React.FC<ContentViewProps> = ({ subjectId, edition }) => {
  const { selectedFile } = useFile();
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = () => {
    // Toggle the accordion
    setActiveIndex(activeIndex === 0 ? -1 : 0);
  };

  const renderFileDetails = () => {
    return (
      <>
        <h3>
          {selectedFile?.name}.{selectedFile?.extension}
        </h3>
        <p>
        <strong>Can be edited:</strong> {
            selectedFile && selectedFile.user_permission && editablePermissions.includes(selectedFile.user_permission as PermissionTypeEditable) && selectedFile.can_be_edited
              ? 'Yes'
              : 'No'
          }
        </p>
        <p>
        <strong>Can be previewed:</strong> {
            selectedFile && selectedFile.user_permission && viewablePermissions.includes(selectedFile.user_permission as PermissionType) && selectedFile.can_be_previewed
              ? 'Yes'
              : 'No'
          }
        </p>
        <p>
          <strong>Is attachment:</strong> {selectedFile?.is_attachment ? 'Yes' : 'No'}
        </p>
      </>
    );
  };

  const handleSave = async (updatedBase64Content: string) => {
    try {
      const token = getToken();

      const response = await fetch(`http://localhost:8000/files/${selectedFile?.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
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

    const fileDetails = renderFileDetails();
    switch (selectedFile.extension) {
      case 'txt':
        return <TextFileComponent file={selectedFile} onSave={handleSave} canEdit={editablePermissions.includes(selectedFile.user_permission as PermissionTypeEditable)}/>;

      case 'md':
        return <MarkdownFile file={selectedFile} onSave={handleSave} canEdit={editablePermissions.includes(selectedFile.user_permission  as PermissionTypeEditable)}/>;
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
            height="500px"
            style={{ minHeight: '500px' }}>
            {' '}
            PDF cannot be displayed, download it{' '}
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
      {selectedFile && (
        <Grid.Row>
          <Grid.Column width={16}>
            <Accordion fluid styled>
              <Accordion.Title active={activeIndex === 0} onClick={handleClick}>
                <Icon name="dropdown" />
                {selectedFile.name}.{selectedFile.extension}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
              <p>
                <strong>Can be edited:</strong> {
                    selectedFile && selectedFile.user_permission && editablePermissions.includes(selectedFile.user_permission  as PermissionTypeEditable) && selectedFile.can_be_edited
                      ? 'Yes'
                      : 'No'
                  }
                </p>
                <p>
                <strong>Can be previewed:</strong> {
                    selectedFile && selectedFile.user_permission && viewablePermissions.includes(selectedFile.user_permission as PermissionType) && selectedFile.can_be_previewed
                      ? 'Yes'
                      : 'No'
                  }
                </p>
                <p>
                  <strong>Is attachment:</strong> {selectedFile.is_attachment ? 'Yes' : 'No'}
                </p>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid.Row>
      )}
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

export default ContentView;
