
export interface BangCapDto {
  ma: string;
  tenLoaiBangCap: string;
  trinhDo: string;
}

export interface GiangVienDto {
  maGiangVien: string;
  hoTen: string;
  ngaySinh: string;
  soDienThoai: string;
  email: string;
  hinhAnh?: string;
  bangCap: BangCapDto[]; 
}