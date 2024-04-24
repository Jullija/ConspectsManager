import React, { useState } from 'react';
import { Button, Grid, Modal } from 'semantic-ui-react';
import { useItem } from '../../context/ItemContext';
import { useClipboard } from '../../context/ClipboardContext';
import { File } from '../../utils/types';
import { axiosClient } from '../../api/axiosClient';
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
    const url = `${baseUrl}/${itemType}s/${selectedItem.id}`;
    try {
      const response = await axiosClient.delete(url);
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
          <Button onClick={goBack} icon="arrow left" content="Wróć do przedmiotu" />
          {canEdit && selectedItem && <Button onClick={handleCopy} icon="copy" content="Kopiuj" />}
          {canEdit && selectedItem && <Button onClick={handleCut} icon="cut" content="Wytnij" />}
          {canEdit && selectedItem && (
            <Button onClick={() => setDeleteConfirmOpen(true)} icon="delete" content="Usuń" />
          )}
          {selectedItem && itemType === 'file' && (
            <Button onClick={handleDownload} icon="download" content="Pobierz Plik" />
          )}
          {canShare && <Button onClick={accessRights} icon="privacy" content="Prawa Dostępu" />}
        </Grid.Column>

        <Grid.Column width={2} textAlign="center">
          <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.2em' }}>
            {selectedItem ? selectedItem.name : 'Nie wybrano elementu'}
          </div>
        </Grid.Column>

        <Grid.Column width={4} textAlign="right">
          {clipboardItem && (
            <div style={{ marginTop: '10px' }}>
              <strong>Schowek:</strong> {clipboardItem.item.name} - {actionType?.toUpperCase()}
            </div>
          )}
        </Grid.Column>
        <Grid.Column width={3} textAlign="right">
          <div style={{ marginTop: '10px' }}>
            Edycja: {subjectId} | ID: {editionId}
          </div>
        </Grid.Column>
      </Grid.Row>

      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        size="small"
        dimmer="blurring">
        <Modal.Header>Usuń element</Modal.Header>
        <Modal.Content>
          <p>Jesteś pewien/a, że chcesz usunąć ten element?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setDeleteConfirmOpen(false)}>
            Nie
          </Button>
          <Button positive onClick={handleDelete}>
            Tak
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
};

export default EditBar;
