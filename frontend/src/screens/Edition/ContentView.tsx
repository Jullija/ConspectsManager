import React from 'react';
import { useFile } from '../../context/FileContext';
import TextFileComponent from './TextFileComponent';

interface ContentViewProps {
  subjectId: number;
  edition?: { id: number; name: string };
}

const ContentView: React.FC<ContentViewProps> = ({ subjectId, edition }) => {
  const { selectedFile } = useFile();

  const renderFileDetails = () => {
    return (
      <>
        <h3>
          {selectedFile?.name}.{selectedFile?.extension}
        </h3>
        <p>
          <strong>Can be edited:</strong> {selectedFile?.can_be_edited ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Can be previewed:</strong> {selectedFile?.can_be_previewed ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Is attachment:</strong> {selectedFile?.is_attachment ? 'Yes' : 'No'}
        </p>
      </>
    );
  };

  const handleSave = async (updatedBase64Content: string) => {
    try {
      const response = await fetch(`http://localhost:8000/files/${selectedFile?.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
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
        return <TextFileComponent file={selectedFile} onSave={handleSave} />;

      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'png':
        return (
          <div>
            {fileDetails}
            <img
              src={`data:image/${selectedFile.extension};base64,${selectedFile.content}`}
              alt={selectedFile.name}
              style={{ maxWidth: '100%' }}
            />
          </div>
        );
      case 'mp4':
        return (
          <div>
            {fileDetails}
            <video
              src={`data:video/${selectedFile.extension};base64,${selectedFile.content}`}
              controls
              style={{ maxWidth: '100%' }}
            />
          </div>
        );
      case 'pdf': {
        const pdfDataUrl = `data:application/pdf;base64,${selectedFile.content}`;
        return (
          <div>
            {fileDetails}
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
          </div>
        );
      }
      default:
        return (
          <div>
            {fileDetails}
            <p>
              Unsupported file type.{' '}
              <a
                href={`data:text/plain;base64,${selectedFile.content}`}
                download={selectedFile.name}>
                Download file
              </a>
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <h2>Content View</h2>
      {renderFileContent()}
    </div>
  );
};

export default ContentView;
