import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import {
  LocalOffer,
  CalendarToday,
  School,
  ArrowForward,
} from '@mui/icons-material';
import { PromotionResponse } from '../model/promotion_model';
import { useNavigate } from 'react-router-dom';
import { getVietnamTime, formatVietnamDate } from '../utils/datetime';

interface PromotionCardProps {
  promotion: PromotionResponse;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return formatVietnamDate(dateString);
  };

  const getRemainingDays = () => {
    const endDate = new Date(promotion.endDate);
    const today = getVietnamTime();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = getRemainingDays();
  const isExpiringSoon = remainingDays <= 7 && remainingDays > 0;
  const isExpired = remainingDays < 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease',
        border: isExpiringSoon ? '2px solid #ff9800' : '1px solid #e0e0e0',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Discount Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          right: 20,
          bgcolor: 'error.main',
          color: 'white',
          borderRadius: '50%',
          width: 80,
          height: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 3,
          zIndex: 1,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {promotion.discountPercent}%
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
          GIẢM
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 4 }}>
        {/* Promotion Type */}
        <Chip
          icon={<LocalOffer sx={{ fontSize: 16 }} />}
          label={promotion.promotionTypeName}
          size="small"
          color="primary"
          sx={{ mb: 2 }}
        />

        {/* Expiring Soon Warning */}
        {isExpiringSoon && !isExpired && (
          <Chip
            label={`Còn ${remainingDays} ngày`}
            size="small"
            sx={{
              bgcolor: '#ff9800',
              color: 'white',
              ml: 1,
              mb: 2,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.7 },
              },
            }}
          />
        )}

        {/* Promotion Name */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '64px',
            color: 'primary.main',
          }}
        >
          {promotion.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '60px',
            mb: 2,
          }}
        >
          {promotion.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Date Range */}
        <Stack spacing={1.5}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              <strong>Từ:</strong> {formatDate(promotion.startDate)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              <strong>Đến:</strong> {formatDate(promotion.endDate)}
            </Typography>
          </Box>

          {/* Applied Courses */}
          {promotion.courses && promotion.courses.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" alignItems="flex-start" gap={1}>
                <School sx={{ fontSize: 18, color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" fontWeight="bold" color="primary.main">
                    Áp dụng cho {promotion.courses.length} khóa học:
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {promotion.courses.slice(0, 3).map((course) => (
                      <Chip
                        key={course.courseId}
                        label={course.courseName}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                        onClick={() => navigate(`/course/${course.courseId}`)}
                      />
                    ))}
                    {promotion.courses.length > 3 && (
                      <Typography variant="caption" color="text.secondary">
                        +{promotion.courses.length - 3} khóa học khác
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Stack>

        {/* View Courses Button */}
        <Button
          variant="contained"
          fullWidth
          endIcon={<ArrowForward />}
          sx={{ mt: 3 }}
          onClick={() => {
            if (promotion.courses && promotion.courses.length > 0) {
              navigate(`/course/${promotion.courses[0].courseId}`);
            } else {
              navigate('/course');
            }
          }}
          disabled={isExpired}
        >
          {isExpired ? 'Đã hết hạn' : 'Xem khóa học'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromotionCard;
