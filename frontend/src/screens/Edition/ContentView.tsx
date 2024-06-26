import { useItem } from '../../context/ItemContext';
import { File, Folder } from '../../utils/types';
import FileContentView from './FileContentView';
import FolderContentView from './FolderContnentView';
import React from 'react';

interface ContentViewProps {
  onChange: () => void;
  canEdit: boolean;
}

const ContentView: React.FC<ContentViewProps> = ({ onChange, canEdit }) => {
  const { selectedItem, itemType } = useItem();

  if (!selectedItem) {
    return <div>Element nie został wybrany</div>;
  }

  switch (itemType) {
    case 'file':
      return <FileContentView selectedFile={selectedItem as File} onChange={onChange} />;
    case 'folder':
      return (
        <FolderContentView
          selectedFolder={selectedItem as Folder}
          onChange={onChange}
          canEdit={canEdit}
        />
      );
    default:
      return <div>Zły typ elementu</div>;
  }
};

export default ContentView;
