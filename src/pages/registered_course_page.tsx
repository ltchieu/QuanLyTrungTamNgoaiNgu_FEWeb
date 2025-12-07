import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Button,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  Room,
  Person,
  School,
  CheckCircle,
  RateReview,
} from "@mui/icons-material";
import { ClassInfo } from "../model/course_model";
import { CourseEvaluation, ReviewResponse } from "../model/course_evaluation";
import { getRegisteredCourses } from "../services/registered_course_service";
import {
  submitEvaluation,
  getStudentEvaluations,
  isCourseEvaluated,
} from "../services/evaluation_service";
import useAxiosPrivate from "../hook/useAxiosPrivate";

const RegisteredCoursePage: React.FC = () => {
  const [courses, setCourses] = useState<ClassInfo[]>([]);
  const [evaluations, setEvaluations] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ClassInfo | null>(null);
  const [teacherRating, setTeacherRating] = useState<number | null>(5);
  const [facilityRating, setFacilityRating] = useState<number | null>(5);
  const [overallRating, setOverallRating] = useState<number | null>(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Notification State
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesRes, evaluationsRes] = await Promise.all([
          getRegisteredCourses(axiosPrivate),
          getStudentEvaluations(axiosPrivate),
        ]);
        if (coursesRes.data && Array.isArray(coursesRes.data.classes)) {
          setCourses(coursesRes.data.classes);
        } else {
          console.warn("Unexpected response format", coursesRes);
          setCourses([]);
        }
        setEvaluations(evaluationsRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  const handleOpenEvaluation = (course: ClassInfo) => {
    setSelectedCourse(course);
    setTeacherRating(5);
    setFacilityRating(5);
    setOverallRating(5);
    setComment("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleSubmit = async () => {
    if (!selectedCourse || !teacherRating || !facilityRating || !overallRating) return;

    setSubmitting(true);
    try {
      const evaluationData: CourseEvaluation = {
        classId: selectedCourse.classId,
        teacherRating: teacherRating,
        facilityRating: facilityRating,
        overallRating: overallRating,
        comment: comment || undefined, // Chỉ gửi comment nếu có nội dung
      };

      await submitEvaluation(axiosPrivate, evaluationData);

      setSnackbarMessage("Cảm ơn bạn đã gửi đánh giá!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCloseDialog();

      // Refresh evaluations
      const newEvaluations = await getStudentEvaluations(axiosPrivate);
      setEvaluations(newEvaluations);
    } catch (error: any) {
      console.error("Error submitting evaluation:", error);
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
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
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4, color: "#2c3e50" }}
      >
        Lớp học đã đăng ký
      </Typography>

      {courses.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Bạn chưa đăng ký lớp học nào.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course, index) => {
            const evaluation = isCourseEvaluated(evaluations, course.classId);
            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ position: "relative", height: 140, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.1,
                      backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)',
                      backgroundSize: '20px 20px'
                    }} />
                    <School sx={{ fontSize: 60, color: 'white', opacity: 0.8 }} />
                    <Chip
                      label={course.status}
                      color={course.status === 'Active' || course.status === 'Đang học' ? "success" : "default"}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontWeight: "bold",
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: 'text.primary'
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      color="text.primary"
                      sx={{
                        minHeight: 56,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {course.courseName}
                    </Typography>

                    <Typography variant="subtitle1" color="primary.main" fontWeight="600" gutterBottom>
                      {course.className}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" flexDirection="column" gap={1.5}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Person color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          GV: <Box component="span" fontWeight="500" color="text.primary">{course.instructorName}</Box>
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Room color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          Phòng: <Box component="span" fontWeight="500" color="text.primary">{course.roomName}</Box>
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1.5}>
                        <CalendarToday color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {course.startDate ? new Date(course.startDate).toLocaleDateString("vi-VN") : "..."} - {course.endDate ? new Date(course.endDate).toLocaleDateString("vi-VN") : "..."}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1.5}>
                        <AccessTime color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {course.schedulePattern} ({course.startTime.slice(0, 5)} - {course.endTime ? course.endTime.slice(0, 5) : "..."})
                        </Typography>
                      </Box>
                    </Box>

                    {/* Enrollment Progress if available */}
                    {(course.maxCapacity && course.currentEnrollment) && (
                      <Box mt={2}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="caption" color="text.secondary">Sĩ số</Typography>
                          <Typography variant="caption" fontWeight="bold">{course.currentEnrollment}/{course.maxCapacity}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.100', borderRadius: 3, overflow: 'hidden' }}>
                          <Box sx={{
                            width: `${Math.min((course.currentEnrollment / course.maxCapacity) * 100, 100)}%`,
                            height: '100%',
                            bgcolor: 'primary.main'
                          }} />
                        </Box>
                      </Box>
                    )}

                    <Box mt={3} pt={2} borderTop={1} borderColor="divider">
                      {evaluation ? (
                        <Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <CheckCircle color="success" sx={{ mr: 1, fontSize: 20 }} />
                            <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                              Đã đánh giá
                            </Typography>
                          </Box>
                          <Box display="flex" flexDirection="column" gap={0.5}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>Giảng viên:</Typography>
                              <Rating value={evaluation.teacherRating} readOnly size="small" />
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>Cơ sở vật chất:</Typography>
                              <Rating value={evaluation.facilityRating} readOnly size="small" />
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>Hài lòng chung:</Typography>
                              <Rating value={evaluation.overallRating} readOnly size="small" />
                            </Box>
                          </Box>
                          {evaluation.comment && (
                            <Typography variant="body2" color="text.secondary" mt={1} sx={{ fontStyle: 'italic' }}>
                              "{evaluation.comment}"
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          startIcon={<RateReview />}
                          onClick={() => handleOpenEvaluation(course)}
                          fullWidth
                          size="small"
                        >
                          Đánh giá
                        </Button>
                      )}
                    </Box>

                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Evaluation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Đánh giá khóa học</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <Box py={1}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {selectedCourse.courseName} - {selectedCourse.className}
              </Typography>

              <Box display="flex" flexDirection="column" gap={3} my={3}>
                <Box>
                  <Typography component="legend" fontWeight="medium" mb={1}>Đánh giá giảng viên *</Typography>
                  <Rating
                    name="teacher-rating"
                    value={teacherRating}
                    onChange={(event, newValue) => {
                      setTeacherRating(newValue);
                    }}
                    size="large"
                  />
                </Box>

                <Box>
                  <Typography component="legend" fontWeight="medium" mb={1}>Đánh giá cơ sở vật chất *</Typography>
                  <Rating
                    name="facility-rating"
                    value={facilityRating}
                    onChange={(event, newValue) => {
                      setFacilityRating(newValue);
                    }}
                    size="large"
                  />
                </Box>

                <Box>
                  <Typography component="legend" fontWeight="medium" mb={1}>Đánh giá hài lòng chung *</Typography>
                  <Rating
                    name="overall-rating"
                    value={overallRating}
                    onChange={(event, newValue) => {
                      setOverallRating(newValue);
                    }}
                    size="large"
                  />
                </Box>
              </Box>

              <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Nhận xét của bạn (Tùy chọn)"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Hãy chia sẻ cảm nhận của bạn về khóa học, giảng viên, cơ sở vật chất..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">Hủy</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={submitting || !teacherRating || !facilityRating || !overallRating}>
            {submitting ? <CircularProgress size={24} /> : "Gửi đánh giá"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisteredCoursePage;
