export type Subject = {
  name: string;
  id: number;
  description: string;
};
export type PermissionType = 'view' | 'edit' | 'owns' | 'admin';
export type PermissionTypeEditable = 'edit' | 'owns' | 'admin';
export type PermissionTypeNormal = 'view' | 'edit' | 'owns';

export type UserEdition = {
  id: number;
  user: number;
  userDetails?: User;
  edition: number | null;
  permission_type: PermissionType;
};

export type User = {
  id: number;
  username: string;
  uid: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isStaff?: boolean;
  isActive?: boolean;
  dateJoined?: Date;
};

export interface File {
  type: 'file';
  id: number;
  name: string;
  extension: string;
  content: string;
  can_be_edited: boolean;
  can_be_previewed: boolean;
  is_attachment: boolean;
  user_permission: string;
}

export interface Folder {
  type: 'folder';
  id: number;
  name: string;
  edition: number;
  parent: number | null;
  files: File[];
  user_permission: string;
}

export interface Edition {
  id: number;
  course: number;
  year: number;
  name: string;
  root_folder: number;
  folders: Folder[];
  user_permission: string;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  folders: TemplateFolder[];
}

export interface TemplateFolder {
  parent: string;
  folder: string;
}
