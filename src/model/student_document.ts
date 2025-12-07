// Response từ backend API GET /students/documents/search
export interface PaginatedDocumentResponse {
  documents: DocumentItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface DocumentItem {
  documentId: number;
  fileName: string;
  link: string;
  description?: string;
  image?: string;
  courseId: number;
  courseName: string;
  moduleId?: number;
  moduleName?: string;
}

// Deprecated - keeping for reference
export interface StudentDocumentResponse {
  courseId: number;
  courseName: string;
  documents: DocumentInfo[];
}

export interface DocumentInfo {
  documentId: number;
  fileName: string;
  link: string;
  description?: string;
  image?: string;
}

export interface StudentDocument {
  id: number;
  tenTaiLieu: string;
  moTa: string;
  link: string;
  loai: 'PDF' | 'VIDEO' | 'AUDIO' | 'OTHER';
  tenKhoaHoc: string;
  tenModule: string;
  hinhAnh?: string;
}
