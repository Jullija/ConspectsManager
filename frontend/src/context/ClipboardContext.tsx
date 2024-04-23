import React, { createContext, useContext, useState, ReactNode } from 'react';
import { File, Folder } from '../utils/types';

type ClipboardActionType = 'copy' | 'cut' | null;
type ItemType = 'file' | 'folder' | null;

interface ClipboardItem {
  item: File | Folder;
  type: ItemType;
}

interface ClipboardContextType {
  clipboardItem: ClipboardItem | null;
  actionType: ClipboardActionType;
  setClipboardItem: (item: File | Folder | null, action: ClipboardActionType) => void;
}

const ClipboardContext = createContext<ClipboardContextType | undefined>(undefined);

export const ClipboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clipboardItem, setClipboardItemState] = useState<ClipboardItem | null>(null);
  const [actionType, setActionType] = useState<ClipboardActionType>(null);

  const setClipboardItem = (item: File | Folder | null, action: ClipboardActionType) => {
    if (!item) {
      setClipboardItemState(null);
    } else {
      const itemType = determineType(item);
      setClipboardItemState({ item, type: itemType });
    }
    setActionType(action);
  };

  const determineType = (item: File | Folder): ItemType => {
    if ('files' in item) {
      return 'folder';
    }
    return 'file';
  };

  return (
    <ClipboardContext.Provider value={{ clipboardItem, actionType, setClipboardItem }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboard = () => {
  const context = useContext(ClipboardContext);
  if (!context) {
    throw new Error('useClipboard must be used within a ClipboardProvider');
  }
  return context;
};
