export interface StudentDocument {
  id: number;
  tenTaiLieu: string;
  moTa: string;
  link: string;
  loai: 'PDF' | 'VIDEO' | 'AUDIO' | 'OTHER';
  tenKhoaHoc: string;
  tenModule: string;
  hinhAnh?: string; // Optional image for preview
}
