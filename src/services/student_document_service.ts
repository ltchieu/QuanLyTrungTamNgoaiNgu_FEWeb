import { StudentDocument } from "../model/student_document";

export const getStudentDocuments = (): Promise<{ data: StudentDocument[] }> => {
  return new Promise((resolve) => {
    // Mock data based on backup.sql for Student ID 1
    // Registered Courses:
    // 1. Khóa IELTS Vocabulary (Course ID 5) -> Modules 33-40
    // 2. Khóa IELTS Reading (Course ID 4) -> Modules 25-32

    const mockData: StudentDocument[] = [
      // Documents for IELTS Reading (Course 4)
      // Module 25: Module 1: Giới thiệu Passage 1
      {
        id: 8,
        tenTaiLieu: "Reading_Passage1_Guide.pdf",
        moTa: "Hướng dẫn Passage 1 Reading",
        link: "https://example.com/docs/reading-passage1.pdf",
        loai: "PDF",
        tenKhoaHoc: "Khóa IELTS Reading",
        tenModule: "Module 1: Giới thiệu Passage 1",
        hinhAnh: "https://example.com/images/passage1.jpg"
      },
      {
        id: 73,
        tenTaiLieu: "Văn bản chủ đề hàng ngày",
        moTa: "Tài liệu đọc hiểu chủ đề hàng ngày",
        link: "#",
        loai: "PDF",
        tenKhoaHoc: "Khóa IELTS Reading",
        tenModule: "Module 1: Giới thiệu Passage 1"
      },
      // Module 27: Module 3: Giới thiệu Passage 3
      {
        id: 9,
        tenTaiLieu: "Reading_Passage3_Guide.pdf",
        moTa: "Hướng dẫn Passage 3 Reading",
        link: "https://example.com/docs/reading-passage3.pdf",
        loai: "PDF",
        tenKhoaHoc: "Khóa IELTS Reading",
        tenModule: "Module 3: Giới thiệu Passage 3",
        hinhAnh: "https://example.com/images/passage3.jpg"
      },
      // Module 28: Module 4: Kỹ năng skimming & scanning
      {
        id: 10,
        tenTaiLieu: "Skimming_Scanning_Guide.pdf",
        moTa: "Hướng dẫn Skimming & Scanning",
        link: "https://example.com/docs/skimming-scanning.pdf",
        loai: "PDF",
        tenKhoaHoc: "Khóa IELTS Reading",
        tenModule: "Module 4: Kỹ năng skimming & scanning",
        hinhAnh: "https://example.com/images/skimming.jpg"
      },
      
      // Documents for IELTS Vocabulary (Course 5)
      // Module 33: Module 1: Từ vựng chủ đề Environment
      {
        id: 11,
        tenTaiLieu: "Vocabulary_Environment.pdf",
        moTa: "Từ vựng chủ đề Environment",
        link: "https://example.com/docs/vocab-environment.pdf",
        loai: "PDF",
        tenKhoaHoc: "Khóa IELTS Vocabulary",
        tenModule: "Module 1: Từ vựng chủ đề Environment",
        hinhAnh: "https://example.com/images/environment.jpg"
      },
      {
        id: 97,
        tenTaiLieu: "Từ vựng về ô nhiễm",
        moTa: "Danh sách từ vựng chi tiết về ô nhiễm môi trường",
        link: "#",
        loai: "PDF",
        tenKhoaHoc: "Khóa IELTS Vocabulary",
        tenModule: "Module 1: Từ vựng chủ đề Environment"
      }
    ];

    setTimeout(() => {
      resolve({ data: mockData });
    }, 500);
  });
};
