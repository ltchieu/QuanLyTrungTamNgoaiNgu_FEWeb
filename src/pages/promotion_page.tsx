import React, { useEffect, useState } from 'react';
import { getVietnamTime } from '../utils/datetime';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
  Fade,
  Paper,
  Grid
} from '@mui/material';
import {
  LocalOffer,
  Search,
  TrendingUp,
  Celebration,
} from '@mui/icons-material';
import promotionService from '../services/promotion_service';
import { PromotionResponse } from '../model/promotion_model';
import PromotionCard from '../componets/promotion_card';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const PromotionPage: React.FC = () => {
  const [promotions, setPromotions] = useState<PromotionResponse[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<PromotionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [tabValue, setTabValue] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchPromotions();
  }, []);

  useEffect(() => {
    filterPromotions();
  }, [promotions, tabValue, searchQuery]);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await promotionService.getActivePromotions();
      setPromotions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách khuyến mãi');
    } finally {
      setLoading(false);
    }
  };

  const filterPromotions = () => {
    let filtered = [...promotions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (promo) =>
          promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          promo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          promo.courses.some((course) =>
            course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by tab
    if (tabValue === 1) {
      // High discount (>= 30%)
      filtered = filtered.filter((promo) => promo.discountPercent >= 30);
    } else if (tabValue === 2) {
      // Expiring soon (within 7 days)
      filtered = filtered.filter((promo) => {
        const endDate = new Date(promo.endDate);
        const today = getVietnamTime();
        const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays > 0;
      });
    }

    // Sort by discount percent (highest first)
    filtered.sort((a, b) => b.discountPercent - a.discountPercent);

    setFilteredPromotions(filtered);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatistics = () => {
    const totalPromotions = promotions.length;
    const highDiscountCount = promotions.filter((p) => p.discountPercent >= 30).length;
    const expiringSoonCount = promotions.filter((p) => {
      const endDate = new Date(p.endDate);
      const today = getVietnamTime();
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    }).length;

    return { totalPromotions, highDiscountCount, expiringSoonCount };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Fade in timeout={500}>
        <Box textAlign="center" mb={5}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
            <Celebration sx={{ fontSize: 50, color: 'error.main' }} />
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #f50057 30%, #ff9800 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Khuyến Mãi Đặc Biệt
            </Typography>
            <Celebration sx={{ fontSize: 50, color: 'error.main' }} />
          </Box>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Cơ hội tuyệt vời để đăng ký khóa học với mức giá ưu đãi nhất
          </Typography>

          {/* Statistics */}
          <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
            <Paper elevation={2} sx={{ px: 3, py: 2, borderRadius: 3 }}>
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                {stats.totalPromotions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chương trình
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{ px: 3, py: 2, borderRadius: 3 }}>
              <Typography variant="h4" fontWeight="bold" color="error.main">
                {stats.highDiscountCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Giảm ≥30%
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{ px: 3, py: 2, borderRadius: 3 }}>
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {stats.expiringSoonCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sắp hết hạn
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Fade>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm khuyến mãi theo tên, mô tả hoặc khóa học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'background.paper',
            },
          }}
        />
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              fontSize: '1rem',
            },
          }}
        >
          <Tab
            icon={<LocalOffer />}
            iconPosition="start"
            label={
              <Box display="flex" alignItems="center" gap={1}>
                Tất cả
                <Chip label={stats.totalPromotions} size="small" color="primary" />
              </Box>
            }
          />
          <Tab
            icon={<TrendingUp />}
            iconPosition="start"
            label={
              <Box display="flex" alignItems="center" gap={1}>
                Giảm giá cao
                <Chip label={stats.highDiscountCount} size="small" color="error" />
              </Box>
            }
          />
          <Tab
            icon={<Celebration />}
            iconPosition="start"
            label={
              <Box display="flex" alignItems="center" gap={1}>
                Sắp hết hạn
                <Chip label={stats.expiringSoonCount} size="small" color="warning" />
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Promotion Cards */}
      <TabPanel value={tabValue} index={tabValue}>
        {filteredPromotions.length === 0 ? (
          <Box textAlign="center" py={8}>
            <LocalOffer sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              {searchQuery
                ? 'Không tìm thấy khuyến mãi phù hợp'
                : 'Hiện chưa có khuyến mãi nào'}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredPromotions.map((promotion, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={promotion.id}>
                <Fade in timeout={300 + index * 100}>
                  <Box>
                    <PromotionCard promotion={promotion} />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
    </Container>
  );
};

export default PromotionPage;
