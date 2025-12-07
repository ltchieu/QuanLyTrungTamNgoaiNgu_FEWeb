// Response từ backend API GET /students/documents
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

// Interface cũ để hiển thị (flatten từ API response)
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
