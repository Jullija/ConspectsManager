import React, { useState } from 'react';
import { Button, Grid, Modal } from 'semantic-ui-react';
import { useItem } from '../../context/ItemContext';
import { useClipboard } from '../../context/ClipboardContext';
import axios from 'axios';
import getToken from '../../utils/tokenManager';
import { File } from '../../utils/types';
interface EditBarProps {
  onChange: () => void;
  goBack: () => void;
  accessRights: () => void;
  subjectId: number;
  editionId: number;
  canEdit: boolean;
  canShare: boolean;
}

const baseUrl = 'http://localhost:8000';
const EditBar: React.FC<EditBarProps> = ({
  onChange,
  goBack,
  accessRights,
  subjectId,
  editionId,
  canEdit,
  canShare
}) => {
  const { selectedItem, itemType, selectItem } = useItem();
  const { setClipboardItem, actionType, clipboardItem } = useClipboard();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleCopy = () => {
    if (selectedItem) {
      setClipboardItem(selectedItem, 'copy');
    }
  };

  const handleCut = () => {
    if (selectedItem) {
      setClipboardItem(selectedItem, 'cut');
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const token = getToken();
    const url = `${baseUrl}/${itemType}s/${selectedItem.id}`;
    try {
      const response = await axios.delete(url, {
        headers: { Authorization: `Token ${token}` }
      });
      console.log('Item deleted successfully:', response.data);
      onChange();
      selectItem(null);
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleDownload = () => {
    if (selectedItem && itemType === 'file') {
      const selectedFile = selectedItem as File;
      const byteCharacters = atob(selectedFile.content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      let mimeType = 'application/octet-stream';
      const extension = selectedFile.extension ? selectedFile.extension.toLowerCase() : '';
      switch (extension) {
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'pdf':
          mimeType = 'application/pdf';
          break;
        case 'txt':
          mimeType = 'text/plain';
          break;
        case 'exe':
          mimeType = 'application/octet-stream';
          break;
        default:
          break;
      }

      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedFile.name}.${selectedFile.extension || 'bin'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={7}>
          <Button onClick={goBack} icon="arrow left" content="Back to Subject" />
          {canEdit && selectedItem && <Button onClick={handleCopy} icon="copy" content="Copy" />}
          {canEdit && selectedItem && <Button onClick={handleCut} icon="cut" content="Cut" />}
          {canEdit && selectedItem && (
            <Button onClick={() => setDeleteConfirmOpen(true)} icon="delete" content="Delete" />
          )}
          {selectedItem && itemType === 'file' && (
            <Button onClick={handleDownload} icon="download" content="Download File" />
          )}
          {canShare && <Button onClick={accessRights} icon="privacy" content="Access Rights" />}
        </Grid.Column>

        <Grid.Column width={2} textAlign="center">
          <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.2em' }}>
            {selectedItem ? selectedItem.name : 'No Item Selected'}
          </div>
        </Grid.Column>

        <Grid.Column width={7} textAlign="right">
          {clipboardItem && (
            <div style={{ marginTop: '10px' }}>
              <strong>Clipboard:</strong> {clipboardItem.item.name} - {actionType?.toUpperCase()}
            </div>
          )}
          <div style={{ marginTop: '10px' }}>
            Edition: {subjectId} | ID: {editionId}
          </div>
        </Grid.Column>
      </Grid.Row>

      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        size="small"
        dimmer="blurring">
        <Modal.Header>Delete Item</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this item?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setDeleteConfirmOpen(false)}>
            No
          </Button>
          <Button positive onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
};

export default EditBar;
