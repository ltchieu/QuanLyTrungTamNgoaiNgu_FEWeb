export interface RegisteredCourse {
  // Invoice Info
  maHoaDon: number;
  ngayDangKy: string;
  tongTien: number;
  trangThaiThanhToan: boolean; // true: Đã thanh toán, false: Chưa thanh toán

  // Course Info
  maKhoaHoc: number;
  tenKhoaHoc: string;
  hinhAnhKhoaHoc: string;

  // Class Info
  maLop: number;
  tenLop: string;
  ngayBatDau: string;
  lichHoc: string; // e.g., "2-4-6"
  gioBatDau: string; // e.g., "18:30:00"
  
  // Room Info
  tenPhong: string;

  // Instructor Info
  tenGiangVien: string;
}
