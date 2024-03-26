import React, { createContext, useContext, useState, ReactNode } from 'react';
import { File } from '../utils/types';

interface FileContextType {
  selectedFile: File | null;
  selectFile: (file: File | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

interface FileProviderProps {
  children: ReactNode;
}

export const FileProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const selectFile = (file: File | null) => setSelectedFile(file);

  return (
    <FileContext.Provider value={{ selectedFile, selectFile }}>{children}</FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};
