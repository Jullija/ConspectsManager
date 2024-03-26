import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Folder } from '../utils/types';

interface FolderContextType {
  selectedFolder: Folder | null;
  selectFolder: (folder: Folder | null) => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

interface FolderProviderProps {
  children: ReactNode;
}

export const FolderProvider: React.FC<FolderProviderProps> = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const selectFolder = (folder: Folder | null) => setSelectedFolder(folder);

  return (
    <FolderContext.Provider value={{ selectedFolder, selectFolder }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => {
  const context = useContext(FolderContext);
  if (context === undefined) {
    throw new Error('useFolder must be used within a FolderProvider');
  }
  return context;
};
