import React from 'react';
import { useFile } from '../../context/FileContext'; // Adjust the import path as needed

interface ContentViewProps {
  subjectId: number;
  edition?: { id: number; name: string }; // Adjust based on your actual type for edition
}

const ContentView: React.FC<ContentViewProps> = ({ subjectId, edition }) => {
  const { selectedFile } = useFile();

  const renderFileContent = () => {
    if (!selectedFile) {
      return <p>No file selected.</p>;
    }

    switch (selectedFile.extension) {
      case 'text':
        return <textarea defaultValue={selectedFile.content} readOnly />;
      case 'image':
        return (
          <img src={`data:image/jpeg;base64,${selectedFile.content}`} alt={selectedFile.name} />
        );
      case 'pdf':
        // Assuming the content for a PDF is a URL to the file
        return (
          <iframe
            src={selectedFile.content}
            title={selectedFile.name}
            width="100%"
            height="500px"
          />
        );
      default:
        return (
          <p>
            Unsupported file type.{' '}
            <a href={selectedFile.content} download>
              Download file
            </a>
          </p>
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
