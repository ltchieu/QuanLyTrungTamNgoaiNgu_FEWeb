import { GiangVienDto } from "./lecturer";
import { HocVienDto } from "./student";

export interface TaiKhoanDto {
  maTaiKhoan: string;
  tenDangNhap: string;
  vaiTro: "Học viên" | "Giảng Viên" | "Admin";
}

export interface UserProfileResponse {
  taiKhoan: TaiKhoanDto;
  hocVienInfo?: HocVienDto;
  giangVienInfo?: GiangVienDto;
}