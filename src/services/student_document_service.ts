import { PaginatedDocumentResponse, DocumentItem, StudentDocument } from "../model/student_document";
import { ApiResponse } from "../model/api_respone";
import { AxiosInstance } from "axios";

/**
 * Lấy tài liệu của học viên từ API với tìm kiếm và phân trang
 * @param axiosPrivate - Axios instance đã được cấu hình với authentication
 * @param courseId - ID khóa học để lọc (optional)
 * @param keyword - Từ khóa tìm kiếm (optional)
 * @param page - Số trang (mặc định 1)
 * @param size - Số lượng tài liệu mỗi trang (mặc định 10)
 */
export const getStudentDocuments = async (
  axiosPrivate: AxiosInstance,
  courseId?: number,
  keyword?: string,
  page: number = 1,
  size: number = 100
): Promise<PaginatedDocumentResponse> => {
  try {
    const params: any = { page, size };
    if (courseId) params.courseId = courseId;
    if (keyword) params.keyword = keyword;

    const response = await axiosPrivate.get<ApiResponse<PaginatedDocumentResponse>>(
      "/students/documents/search",
      { params }
    );

    if (response.data && response.data.code === 1000 && response.data.data) {
      return response.data.data;
    } else {
      return {
        documents: [],
        currentPage: 1,
        totalPages: 0,
        totalItems: 0
      };
    }
  } catch (error: any) {
    console.error("Đọc lấy danh sách tài liệu:", error);
    throw error;
  }
};

/**
 * Chuyển đổi dữ liệu từ API response sang format hiển thị
 */
export const transformDocumentsForDisplay = (
  documents: DocumentItem[]
): StudentDocument[] => {
  return documents.map((doc) => {
    // Xác định loại tài liệu dựa trên extension
    let loai: 'PDF' | 'VIDEO' | 'AUDIO' | 'OTHER' = 'OTHER';
    const fileName = doc.fileName.toLowerCase();
    
    if (fileName.endsWith('.pdf')) {
      loai = 'PDF';
    } else if (fileName.match(/\.(mp4|avi|mov|mkv|webm)$/)) {
      loai = 'VIDEO';
    } else if (fileName.match(/\.(mp3|wav|aac|flac)$/)) {
      loai = 'AUDIO';
    }

    return {
      id: doc.documentId,
      tenTaiLieu: doc.fileName,
      moTa: doc.description || '',
      link: doc.link,
      loai: loai,
      tenKhoaHoc: doc.courseName,
      tenModule: doc.moduleName || '',
      hinhAnh: doc.image,
    };
  });
};

// === CODE CŨ (GIỮT LẠI ĐỂ THAM KHẢO NẾU CẦN) ===
/*
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
*/
