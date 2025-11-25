import React, { useEffect, useState, useMemo } from "react";
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
import { getStudentDocuments } from "../services/student_document_service";

const StudentDocumentPage: React.FC = () => {
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getStudentDocuments();
        setDocuments(response.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const uniqueCourses = useMemo(() => {
    const courses = new Set(documents.map((doc) => doc.tenKhoaHoc));
    return ["All", ...Array.from(courses)];
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.tenTaiLieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tenModule.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse =
        selectedCourse === "All" || doc.tenKhoaHoc === selectedCourse;
      return matchesSearch && matchesCourse;
    });
  }, [documents, searchTerm, selectedCourse]);

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
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                label="Lọc theo khóa học"
                sx={{ bgcolor: "white", borderRadius: 2 }}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterList color="action" />
                  </InputAdornment>
                }
              >
                {uniqueCourses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course === "All" ? "Tất cả khóa học" : course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {filteredDocuments.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Description sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Không tìm thấy tài liệu nào.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredDocuments.map((doc) => (
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
      )}
    </Container>
  );
};

export default StudentDocumentPage;
