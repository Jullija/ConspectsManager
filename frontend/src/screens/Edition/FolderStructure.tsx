import React, { useEffect, useState } from 'react';
import { useFile } from '../../context/FileContext';
import { Folder, File as FileType } from '../../utils/types'; // Renamed for clarity
import { Icon, List } from 'semantic-ui-react';
import { getFile } from '../../api/file';

interface FolderStructureProps {
  folders: Folder[];
  parent?: number | null;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ folders, parent = null }) => {
  const { selectedFile, selectFile } = useFile();
  const [collapsedFolders, setCollapsedFolders] = useState<number[]>([]);

  const toggleFolder = (folderId: number) => {
    setCollapsedFolders((collapsedFolders) =>
      collapsedFolders.includes(folderId)
        ? collapsedFolders.filter((id) => id !== folderId)
        : [...collapsedFolders, folderId]
    );
  };

  const isFolderCollapsed = (folderId: number) => {
    return collapsedFolders.includes(folderId);
  };

  const isFileSelected = (fileId: number) => {
    return selectedFile?.id === fileId;
  };

  const handleFileClick = async (file: FileType) => {
    const data = await getFile(file.id);
    selectFile(data || null);
  };

  return (
    <List>
      {folders
        .filter((folder) => folder.parent === parent)
        .map((folder) => (
          <List.Item key={folder.id}>
            <Icon name="folder" onClick={() => toggleFolder(folder.id)} />
            <List.Content>
              <List.Header as="a" onClick={() => toggleFolder(folder.id)}>
                {folder.name}
              </List.Header>
              {!isFolderCollapsed(folder.id) && (
                <List.List>
                  {folder.files.map((file: FileType) => (
                    <List.Item
                      key={file.id}
                      onClick={() => handleFileClick(file)}
                      style={{
                        backgroundColor: isFileSelected(file.id) ? 'lightgrey' : 'transparent'
                      }}>
                      <Icon name={file.can_be_previewed ? 'file outline' : 'attach'} />
                      <List.Content>
                        {file.name}.{file.extension}
                      </List.Content>
                    </List.Item>
                  ))}
                  {/* Recursive call for child folders */}
                  <FolderStructure folders={folders} parent={folder.id} />
                </List.List>
              )}
            </List.Content>
          </List.Item>
        ))}
    </List>
  );
};

export default FolderStructure;
