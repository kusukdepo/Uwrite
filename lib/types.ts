export interface Document {
    id: string;
    ownerId: string;
    title: string;
    content: string; // HTML from Tiptap
    updatedAt: number;
}
