export type NoteTitleAndMetaDataType = {
  unique_id?: string;
  id: number;
  title: string;
  tags: string[];
  lastEdited: string;
};

export type Note = NoteTitleAndMetaDataType & {
  content: string;
  isSaved: boolean;
};

export type NotesType = "saved-notes" | "archived-notes";
