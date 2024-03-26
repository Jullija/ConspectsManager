import React from 'react';
import { Button } from 'semantic-ui-react';

interface EditBarProps {
  onCut: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDelete: () => void;
  goBack: () => void; // New prop for going back
  addFolder: () => void;
  addFile: () => void;
  uploadFile: () => void;
  accessRights: () => void; // New prop for accessing rights
  subjectId: number;
  editionId: number;
}

const EditBar: React.FC<EditBarProps> = ({
  onCut,
  onCopy,
  onPaste,
  onDelete,
  goBack,
  addFolder,
  accessRights,
  addFile,
  uploadFile,
  subjectId,
  editionId
}) => {
  return (
    <div
      style={{
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <div>
        <Button onClick={goBack} icon="arrow left" content="Back to Subject" />
        <Button onClick={onCopy} icon="copy" content="Copy" />
        <Button onClick={onCut} icon="cut" content="Cut" />
        <Button onClick={onPaste} icon="paste" content="Paste" />
        <Button onClick={onDelete} icon="delete" content="Delete" />
        <Button onClick={addFolder} icon="folder" content="Add Folder" />
        <Button onClick={addFile} icon="file" content="Add File" />
        <Button onClick={uploadFile} icon="upload" content="Upload File" />
        <Button onClick={accessRights} icon="privacy" content="Access Rights" />
      </div>
      <div>
        Edition: {subjectId} | ID: {editionId}
      </div>
    </div>
  );
};

export default EditBar;
