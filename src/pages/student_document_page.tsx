import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,
  Chip,
  Divider,
  Pagination,
} from "@mui/material";
import {
  Search,
  Description,
  PictureAsPdf,
  VideoLibrary,
  AudioFile,
  FilterList,
  Download,
} from "@mui/icons-material";
import { StudentDocument } from "../model/student_document";
import { getStudentDocuments, transformDocumentsForDisplay } from "../services/student_document_service";
import { getRegisteredCourses } from "../services/registered_course_service";
import { ClassInfo } from "../model/course_model";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import useDebounce from "../hook/useDebounce";

const StudentDocumentPage: React.FC = () => {
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined);
  const [courses, setCourses] = useState<ClassInfo[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 12;
  
  const axiosPrivate = useAxiosPrivate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Use custom useDebounce hook
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch registered courses for filter dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getRegisteredCourses(axiosPrivate);
        if (response.data && response.data.classes) {
          setCourses(response.data.classes);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [axiosPrivate]);

  // Fetch documents with filters and pagination
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await getStudentDocuments(
          axiosPrivate,
          selectedCourseId,
          debouncedSearchTerm || undefined,
          currentPage,
          pageSize
        );
        
        const transformedDocs = transformDocumentsForDisplay(response.documents);
        setDocuments(transformedDocs);
        setTotalPages(response.totalPages);
        setTotalItems(response.totalItems);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [axiosPrivate, selectedCourseId, debouncedSearchTerm, currentPage]);

  // Focus search input after loading completes
  useEffect(() => {
    if (!loading && searchTerm && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [loading, searchTerm]);

  // Extract unique courses from registered classes
  const uniqueCourses = useMemo(() => {
    const courseMap = new Map<number, string>();
    courses.forEach((classInfo) => {
      if (!courseMap.has(classInfo.courseId)) {
        courseMap.set(classInfo.courseId, classInfo.courseName);
      }
    });
    return Array.from(courseMap.entries()).map(([id, name]) => ({ id, name }));
  }, [courses]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCourseChange = (e: any) => {
    const value = e.target.value;
    setSelectedCourseId(value === "All" ? undefined : value);
    setCurrentPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case "PDF":
        return <PictureAsPdf color="error" />;
      case "VIDEO":
        return <VideoLibrary color="primary" />;
      case "AUDIO":
        return <AudioFile color="warning" />;
      default:
        return <Description color="action" />;
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box mb={5}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#2c3e50" }}
        >
          Tài liệu học tập
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Truy cập tài liệu cho các khóa học bạn đã đăng ký.
        </Typography>
      </Box>

      <Card elevation={0} sx={{ mb: 4, bgcolor: "transparent" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên tài liệu..."
              value={searchTerm}
              onChange={handleSearchChange}
              inputRef={searchInputRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: { bgcolor: "white", borderRadius: 2 },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="course-filter-label">Lọc theo khóa học</InputLabel>
              <Select
                labelId="course-filter-label"
                value={selectedCourseId ?? "All"}
                onChange={handleCourseChange}
                label="Lọc theo khóa học"
                sx={{ bgcolor: "white", borderRadius: 2 }}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList color="action" />
                  </InputAdornment>
                }
              >
                <MenuItem value="All">Tất cả khóa học</MenuItem>
                {uniqueCourses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {documents.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Description sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Không tìm thấy tài liệu nào.
          </Typography>
        </Box>
      ) : (
        <>
        <Grid container spacing={3}>
          {documents.map((doc) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={doc.id}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    height: 140,
                    bgcolor: "#f5f5f5",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {doc.hinhAnh ? (
                    <Box
                      component="img"
                      src={doc.hinhAnh}
                      alt={doc.tenTaiLieu}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    getIconByType(doc.loai)
                  )}
                  <Chip
                    label={doc.loai}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "rgba(255,255,255,0.9)",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="caption"
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                    display="block"
                  >
                    {doc.tenKhoaHoc}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: 56,
                    }}
                  >
                    {doc.tenTaiLieu}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {doc.tenModule}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Download />}
                    href={doc.link}
                    target="_blank"
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Tải xuống / Xem
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
        </>
      )}
      
      {/* Summary */}
      {totalItems > 0 && (
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Hiển thị {documents.length} / {totalItems} tài liệu
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default StudentDocumentPage;
