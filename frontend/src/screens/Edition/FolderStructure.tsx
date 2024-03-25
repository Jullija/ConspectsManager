import React from 'react';
import { useFile } from '../../context/FileContext';
import { Folder, File } from '../../utils/types';
import { Icon, List } from 'semantic-ui-react';

interface FolderStructureProps {
  folders: Folder[];
  parent?: number | null;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ folders, parent = null }) => {
  const { selectFile } = useFile();

  return (
    <List>
      {folders
        .filter((folder) => folder.parent === parent)
        .map((folder) => (
          <List.Item key={folder.id}>
            <Icon name="folder" />
            <List.Content>
              <List.Header>{folder.name}</List.Header>
              <List.List>
                {folder.files.map((file: File) => (
                  <List.Item key={file.id} onClick={() => selectFile(file)}>
                    <Icon name={file.can_be_previewed ? 'file outline' : 'attach'} />
                    <List.Content>
                      {file.name}.{file.extension}
                    </List.Content>
                  </List.Item>
                ))}
              </List.List>
              {/* Recursive call for child folders */}
              <FolderStructure folders={folders} parent={folder.id} />
            </List.Content>
          </List.Item>
        ))}
    </List>
  );
};

export default FolderStructure;
