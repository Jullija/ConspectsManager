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
  canEdit: boolean;
  canShare: boolean; // New prop to control access rights editing
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
  editionId,
  canEdit,
  canShare,
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
        {canEdit && (
          <Button onClick={onCopy} icon="copy" content="Copy" />
          )}
        {canEdit && (
          <Button onClick={onCut} icon="cut" content="Cut" />
          )}
        {canEdit && (
          <Button onClick={onPaste} icon="paste" content="Paste" />
          )}
        {canEdit && (
          <Button onClick={onDelete} icon="delete" content="Delete" />
          )}
        {canEdit && (
          <Button onClick={addFolder} icon="folder" content="Add Folder" />
          )}
        {canEdit && (
          <Button onClick={addFile} icon="file" content="Add File" />
          )}
        {canEdit && (
          <Button onClick={uploadFile} icon="upload" content="Upload File" />
          )}
        {canShare && (
          <Button onClick={accessRights} icon="privacy" content="Access Rights" />
          )}
      </div>
      <div>
        Edition: {subjectId} | ID: {editionId}
      </div>
    </div>
  );
};

export default EditBar;
