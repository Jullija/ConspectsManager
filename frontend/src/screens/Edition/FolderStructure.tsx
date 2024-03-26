import React, { useState } from 'react';
import { useFile } from '../../context/FileContext';
import { useFolder } from '../../context/FolderContext';
import { Folder, File as FileType } from '../../utils/types';
import { Icon, List } from 'semantic-ui-react';
import { getFile } from '../../api/file';

interface FolderStructureProps {
  folders: Folder[];
  parent?: number | null;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ folders, parent = null }) => {
  const { selectedFile, selectFile } = useFile();
  const { selectFolder } = useFolder();
  const [collapsedFolders, setCollapsedFolders] = useState<number[]>([]);

  const toggleFolderCollapse = (folderId: number) => {
    setCollapsedFolders((currentCollapsedFolders) =>
      currentCollapsedFolders.includes(folderId)
        ? currentCollapsedFolders.filter((id) => id !== folderId)
        : [...currentCollapsedFolders, folderId]
    );
  };

  const isFolderCollapsed = (folderId: number) => collapsedFolders.includes(folderId);

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
            <Icon
              name={isFolderCollapsed(folder.id) ? 'folder' : 'folder open'}
              onClick={() => toggleFolderCollapse(folder.id)}
            />
            <List.Content>
              <List.Header as="a" onClick={() => selectFolder(folder)}>
                {folder.name}
              </List.Header>
              {!isFolderCollapsed(folder.id) && (
                <List.List>
                  {folder.files.map((file: FileType) => (
                    <List.Item
                      key={file.id}
                      onClick={() => handleFileClick(file)}
                      style={{
                        backgroundColor: file.id === selectedFile?.id ? 'lightgrey' : 'transparent'
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