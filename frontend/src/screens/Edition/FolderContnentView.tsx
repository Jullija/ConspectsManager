import React, { useState } from 'react';
import { Button, Segment, Modal, Form, Input, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Folder } from '../../utils/types';
import { useClipboard } from '../../context/ClipboardContext';
import getToken from '../../utils/tokenManager';
import { axiosClient } from '../../api/axiosClient';

interface FolderContentViewProps {
  selectedFolder: Folder;
  onChange: () => void;
  canEdit: boolean;
}

interface FileUpload {
  content: string;
  name: string;
  extension: string;
}

const baseUrl = 'http://localhost:8000';
const FolderContentView: React.FC<FolderContentViewProps> = ({
  selectedFolder,
  onChange,
  canEdit
}) => {
  const [isFileModalOpen, setFileModalOpen] = useState(false);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileExtension, setNewFileExtension] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [fileToUpload, setFileToUpload] = useState<FileUpload | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { clipboardItem, actionType } = useClipboard();

  const handlePaste = async () => {
    if (!clipboardItem) return;

    let url = '';

    try {
      if (clipboardItem.type === 'file') {
        if (actionType === 'copy') {
          url = `${baseUrl}/files/${clipboardItem.item.id}/copy_to_folder/?destination_folder_id=${selectedFolder.id}`;
          await axiosClient.get(url);
          console.log('File copied successfully.');
        } else if (actionType === 'cut') {
          url = `${baseUrl}/files/${clipboardItem.item.id}/`;
          await axiosClient.patch(url, { folder: selectedFolder.id });
          console.log('File moved successfully.');
        }
      } else if (clipboardItem.type === 'folder') {
        if (actionType === 'copy') {
          url = `${baseUrl}/folders/${clipboardItem.item.id}/copy_to/?destination_folder_id=${selectedFolder.id}`;
          await axiosClient.get(url);
          console.log('Folder copied successfully.');
        } else if (actionType === 'cut') {
          url = `${baseUrl}/folders/${clipboardItem.item.id}/`;
          await axiosClient.patch(url, { parent: selectedFolder.id });
          console.log('Folder moved successfully.');
        }
      }
      onChange();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to paste item:', error.message);
        setErrorMessage(`Failed to paste item: ${error.message}`);
      } else {
        console.error('Failed to paste item:', error);
        setErrorMessage('Failed to paste item due to an unexpected error.');
      }
    }
  };

  const handleAddFile = async () => {
    const url = `/files/`;

    try {
      const response = await axiosClient.post(url, {
        name: newFileName,
        extension: newFileExtension,
        content: '',
        folder: selectedFolder.id
      });

      console.log('File added successfully:', response.data);
      setFileModalOpen(false);
      onChange();
    } catch (error) {
      console.error('Failed to add file:', error);
    }
  };

  const handleAddFolder = async () => {
    const url = `/folders/`;

    try {
      const response = await axiosClient.post(url, {
        name: newFolderName,
        parent: selectedFolder.id
      });

      console.log('Folder added successfully:', response.data);
      setFolderModalOpen(false);
      onChange();
    } catch (error) {
      console.error('Failed to add folder:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const base64 = result.split(',')[1];
          setFileToUpload({
            content: base64,
            name: file.name.split('.').slice(0, -1).join('.'),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            extension: file.name.split('.').pop()!
          });
        }
      };
      reader.onerror = (error) => console.error('Error converting file:', error);
    }
  };

  const handleUploadFile = async () => {
    if (!fileToUpload) return;
    const url = `/files/`;

    try {
      const response = await axiosClient.post(url, {
        name: fileToUpload.name,
        extension: fileToUpload.extension,
        content: fileToUpload.content,
        folder: selectedFolder.id
      });

      console.log('File uploaded successfully:', response.data);
      setUploadModalOpen(false);
      onChange();
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const closeModal = () => setErrorMessage('');

  return (
    <Segment>
      {canEdit && (
        <>
          <Button onClick={() => setFileModalOpen(true)}>Add File</Button>
          <Button onClick={() => setFolderModalOpen(true)}>Add Folder</Button>
          <Button onClick={() => setUploadModalOpen(true)}>Upload File</Button>
          {clipboardItem && <Button onClick={handlePaste}>Paste</Button>}
        </>
      )}

      {/* Modal for adding file */}
      <Modal open={isFileModalOpen} onClose={() => setFileModalOpen(false)} size="small">
        <Header icon="file" content="Add New File" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>File Name</label>
              <Input
                placeholder="Enter file name"
                onChange={(e) => setNewFileName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>File Extension</label>
              <Input
                placeholder="Enter file extension"
                onChange={(e) => setNewFileExtension(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setFileModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleAddFile}>
            Add File
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Modal for adding folder */}
      <Modal open={isFolderModalOpen} onClose={() => setFolderModalOpen(false)} size="small">
        <Header icon="folder" content="Add New Folder" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Folder Name</label>
              <Input
                placeholder="Enter folder name"
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setFolderModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleAddFolder}>
            Add Folder
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={isUploadModalOpen} onClose={() => setUploadModalOpen(false)} size="small">
        <Header icon="upload" content="Upload File" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Select File</label>
              <Input type="file" onChange={handleFileChange} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setUploadModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleUploadFile}>
            Upload
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={!!errorMessage} onClose={closeModal} size="small">
        <Header icon="exclamation triangle" content="Error" />
        <Modal.Content>
          <p>{errorMessage}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Segment>
  );
};

export default FolderContentView;
