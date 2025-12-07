import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  CircularProgress,
  Chip,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import {
  RateReview,
  CalendarToday,
  School,
  BookmarkBorder,
} from "@mui/icons-material";
import { ReviewResponse } from "../model/course_evaluation";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { getImageUrl } from "../services/course_services";
import { getStudentEvaluations } from "../services/evaluation_service";

const ReviewHistoryPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getStudentEvaluations(axiosPrivate);
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [axiosPrivate]);

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
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <RateReview sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#2c3e50" }}
          >
            Lịch sử đánh giá
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Xem lại tất cả các đánh giá bạn đã gửi cho các khóa học
        </Typography>
      </Box>

      {reviews.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            bgcolor: "#f8f9fa",
            borderRadius: 3,
          }}
        >
          <RateReview sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Chưa có đánh giá nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bạn chưa đánh giá khóa học nào. Hãy đánh giá các khóa học bạn đã tham gia!
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {reviews.map((review) => (
            <Card
              key={review.reviewId}
              elevation={2}
              sx={{
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  {/* Course Image */}
                  <Box sx={{ width: { xs: "100%", md: "25%" } }}>
                      <Box
                        sx={{
                          position: "relative",
                          paddingTop: "60%",
                          borderRadius: 2,
                          overflow: "hidden",
                          bgcolor: "#f0f0f0",
                        }}
                      >
                        {review.courseImage ? (
                          <Box
                            component="img"
                            src={getImageUrl(review.courseImage)}
                            alt={review.courseName}
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "primary.main",
                            }}
                          >
                            <School sx={{ fontSize: 50, color: "white", opacity: 0.5 }} />
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Review Content */}
                    <Box sx={{ flex: 1 }}>
                      <Box>
                        {/* Course Name */}
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <BookmarkBorder sx={{ color: "primary.main", fontSize: 20 }} />
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary.main"
                          >
                            {review.courseName}
                          </Typography>
                        </Box>

                        {/* Class Name */}
                        {review.className && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                          >
                            Lớp: {review.className}
                          </Typography>
                        )}

                        <Divider sx={{ my: 2 }} />

                        {/* Rating */}
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <Typography variant="body2" color="text.secondary" fontWeight="medium">
                            Đánh giá của bạn:
                          </Typography>
                          <Rating value={review.rating} readOnly size="medium" />
                          <Chip
                            label={`${review.rating}/5`}
                            size="small"
                            color="primary"
                            sx={{ fontWeight: "bold" }}
                          />
                        </Box>

                        {/* Comment */}
                        {review.comment && (
                          <Box
                            sx={{
                              bgcolor: "#f8f9fa",
                              p: 2,
                              borderRadius: 2,
                              borderLeft: "4px solid",
                              borderColor: "primary.main",
                              mb: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontStyle: "italic",
                                lineHeight: 1.6,
                              }}
                            >
                              "{review.comment}"
                            </Typography>
                          </Box>
                        )}

                        {/* Review ID - hidden but useful for debugging */}
                        <Box display="flex" alignItems="center" gap={1} mt={2}>
                          <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                          <Typography variant="caption" color="text.secondary">
                            Mã đánh giá: #{review.reviewId}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Summary */}
      {reviews.length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "#f0f7ff",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            Tổng số đánh giá: {reviews.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Trung bình:{" "}
            <strong>
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}/5 ⭐
            </strong>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ReviewHistoryPage;
