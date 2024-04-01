export type Subject = {
  name: string;
  id: number;
  description: string;
};

export interface File {
  id: number;
  name: string;
  extension: string;
  content: string;
  can_be_edited: boolean;
  can_be_previewed: boolean;
  is_attachment: boolean;
}

export interface Folder {
  id: number;
  name: string;
  edition: number;
  parent: number | null;
  files: File[];
}

export interface Edition {
  id: number;
  course: number;
  year: number;
  name: string;
  root_folder: number;
  folders: Folder[];
}

export interface Template {
  title: string;
}
