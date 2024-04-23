import React, { createContext, useContext, useState, ReactNode } from 'react';

import { File, Folder } from '../utils/types';

type SelectedItem = File | Folder | null;
type ItemType = 'file' | 'folder' | null;

interface ItemContextType {
  selectedItem: SelectedItem;
  itemType: ItemType;
  selectItem: (item: SelectedItem) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [itemType, setItemType] = useState<ItemType>(null);

  const selectItem = (item: SelectedItem) => {
    setSelectedItem(item);
    setItemType(determineType(item));
  };

  const determineType = (item: SelectedItem): ItemType => {
    if (!item) return null;
    return 'id' in item && 'files' in item ? 'folder' : 'file';
  };

  return (
    <ItemContext.Provider value={{ selectedItem, itemType, selectItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};
