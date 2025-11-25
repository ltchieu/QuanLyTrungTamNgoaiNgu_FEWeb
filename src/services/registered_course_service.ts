import { RegisteredCourse } from "../model/registered_course";

export const getRegisteredCourses = (): Promise<{ data: RegisteredCourse[] }> => {
  return new Promise((resolve) => {
    // Mock data based on backup.sql for Student ID 1 (Nguyen Ngoc Anh)
    // Invoice 1: Course 5 (Vocab), Class 5 (Vocab 3)
    // Invoice 1: Course 4 (Reading), Class 4 (Vocab 3 - wait, backup.sql says Class 4 is Vocab 3 too? Let's check)
    // Checking backup.sql:
    // Class 4: makhoahoc 5 (Vocab), magiangvien 3 (Tran Van D), maphong 3 (A102), tenlop "Lớp IELTS Vocabulary 3"
    // Class 5: makhoahoc 4 (Reading), magiangvien 3 (Tran Van D), maphong 3 (A102), tenlop "Lớp IELTS Vocabulary 3" (Name seems duplicated in DB but different course)
    
    // Invoice 5: Course 4 (Reading), Class 4 (Vocab 3) - Wait, Invoice 5 has details 10 and 11
    // Detail 10: hoadon 5, malop 4, giaban 6000000
    // Detail 11: hoadon 5, malop 5, giaban 6800000
    
    // Let's use Invoice 5 data as it's more recent (2025-11-23)
    
    const mockData: RegisteredCourse[] = [
      {
        maHoaDon: 5,
        ngayDangKy: "2025-11-23T13:26:17",
        tongTien: 12800000,
        trangThaiThanhToan: false, // trangthai 0 in DB
        
        // Class 4 Info (Linked to Course 5 - Vocabulary)
        maKhoaHoc: 5,
        tenKhoaHoc: "Khóa IELTS Vocabulary",
        hinhAnhKhoaHoc: "khoahoc5.png",
        maLop: 4,
        tenLop: "Lớp IELTS Vocabulary 3",
        ngayBatDau: "2025-12-01",
        lichHoc: "2-4-6",
        gioBatDau: "18:30:00",
        tenPhong: "Phòng A102",
        tenGiangVien: "Trần Văn D"
      },
      {
        maHoaDon: 5,
        ngayDangKy: "2025-11-23T13:26:17",
        tongTien: 12800000,
        trangThaiThanhToan: false,
        
        // Class 5 Info (Linked to Course 4 - Reading)
        maKhoaHoc: 4,
        tenKhoaHoc: "Khóa IELTS Reading",
        hinhAnhKhoaHoc: "khoahoc4.png",
        maLop: 5,
        tenLop: "Lớp IELTS Vocabulary 3",
        ngayBatDau: "2025-01-17",
        lichHoc: "2-4-6",
        gioBatDau: "18:30:00",
        tenPhong: "Phòng A102",
        tenGiangVien: "Trần Văn D"
      }
    ];

    setTimeout(() => {
      resolve({ data: mockData });
    }, 500);
  });
};
