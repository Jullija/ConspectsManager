import React from 'react';
import { Button } from 'semantic-ui-react';

// If you have a specific type for the item being edited, you can pass it as a prop to EditBar for more specific actions.
interface EditBarProps {
  onEdit: () => void;
  onCopy: () => void;
  onPaste: () => void;
}

const EditBar: React.FC<EditBarProps> = ({ onEdit, onCopy, onPaste }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Button onClick={onEdit} icon="edit" content="Edit" />
      <Button onClick={onCopy} icon="copy" content="Copy" />
      <Button onClick={onPaste} icon="paste" content="Paste" />
    </div>
  );
};

export default EditBar;
