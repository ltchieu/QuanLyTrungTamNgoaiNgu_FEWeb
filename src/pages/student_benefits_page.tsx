import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Fade,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid
} from '@mui/material';
import {
  CheckCircle,
  Star,
  School,
  Verified,
  Support,
  LibraryBooks,
  Assessment,
  EmojiEvents,
  CardGiftcard,
  ExpandMore,
  Celebration,
} from '@mui/icons-material';

const StudentBenefitsPage: React.FC = () => {
  const beforeLearning = [
    'Test đầu vào miễn phí (full format hoặc rút gọn theo nhu cầu)',
    'Định hướng lộ trình học phù hợp với mục tiêu',
    'Nhận tài liệu tự học miễn phí',
    'Học thử 3 buổi đầu tiên không mất phí',
    'Tư vấn chi tiết về khóa học và phương pháp',
  ];

  const duringLearning = [
    {
      title: 'Về giảng dạy',
      items: [
        'Chuyển lớp miễn phí trong tuần đầu nếu không phù hợp',
        'Học phí đã bao gồm toàn bộ tài liệu, không phát sinh thêm',
        'Nhận slides bài giảng sau mỗi buổi kèm hướng dẫn bài tập',
        'Giáo viên IELTS 8.0+ trực tiếp giảng dạy',
      ],
    },
    {
      title: 'Về tài liệu & công cụ',
      items: [
        'Truy cập bộ từ vựng qua app Quizlet (5000+ từ)',
        'Lịch ôn từ vựng cụ thể theo từng bài học',
        'Website luyện đề với giao diện như thi thật',
        'Kho tài liệu phong phú và cập nhật thường xuyên',
      ],
    },
    {
      title: 'Về hỗ trợ học tập',
      items: [
        'Hệ thống theo dõi tiến độ học tập chi tiết',
        'Giáo viên chấm sửa bài + giải đáp thắc mắc ngoài giờ',
        'Livestream/Record bài khi nghỉ có phép',
        'Tư vấn viên chăm sóc riêng cho mỗi lớp',
      ],
    },
    {
      title: 'Chính sách linh hoạt',
      items: [
        'Bảo lưu không giới hạn trong 8 tháng',
        'Form feedback ẩn danh để góp ý',
        'Giải quyết mọi vấn đề trong 1-3 ngày',
        'Cam kết bảo vệ quyền lợi học viên tối đa',
      ],
    },
  ];

  const afterLearning = [
    {
      category: 'Hỗ trợ tài nguyên',
      icon: <LibraryBooks />,
      benefits: [
        'Gói chấm sửa Writing & Speaking miễn phí 3-6 tháng',
        'Plan gợi ý + kho tài liệu để tiếp tục tự học',
        'Tham gia miễn phí workshop/mock test do trung tâm tổ chức',
        'Truy cập trọn đời vào các tài liệu đã học',
      ],
    },
    {
      category: 'Hỗ trợ trước & sau thi',
      icon: <Assessment />,
      benefits: [
        'Buổi Mentoring 1-1 với giáo viên trước khi đi thi',
        'Hỗ trợ đăng ký thi qua IDP',
        'Học lại miễn phí 1 lần nếu muốn nắm vững hơn',
        'Cam kết đầu ra: học lại free đến khi đạt mục tiêu',
      ],
    },
  ];

  const highlights = [
    {
      title: 'Phương pháp độc quyền',
      description: 'TRUE Grammar, PAW, SWITCH - được nghiên cứu bởi chuyên gia giáo dục',
      icon: <Star />,
      color: 'warning.main',
    },
    {
      title: 'Cam kết đầu ra',
      description: 'Học lại free không giới hạn nếu chưa đạt mục tiêu',
      icon: <Verified />,
      color: 'success.main',
    },
    {
      title: 'Tài liệu chất lượng',
      description: 'Biên soạn và cập nhật thường xuyên theo xu hướng đề thi',
      icon: <LibraryBooks />,
      color: 'info.main',
    },
    {
      title: 'Lộ trình tối ưu',
      description: 'Rút ngắn thời gian học nhưng vẫn đảm bảo chất lượng cao',
      icon: <EmojiEvents />,
      color: 'error.main',
    },
  ];

  const stats = [
    { number: '95%', label: 'Học viên hài lòng', icon: '😊' },
    { number: '90%', label: 'Đạt mục tiêu', icon: '🎯' },
    { number: '5000+', label: 'Học viên', icon: '👥' },
    { number: '10+', label: 'Năm kinh nghiệm', icon: '⭐' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Hero */}
      <Fade in timeout={500}>
        <Box textAlign="center" mb={6}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
            <Celebration sx={{ fontSize: 50, color: 'primary.main' }} />
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              QUYỀN LỢI HỌC VIÊN
            </Typography>
            <Celebration sx={{ fontSize: 50, color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Cam kết và đảm bảo quyền lợi học viên xuyên suốt hành trình học tập
          </Typography>
        </Box>
      </Fade>

      {/* Statistics */}
      <Grid container spacing={3} mb={6}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={index}>
            <Fade in timeout={300 + index * 100}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography variant="h2" mb={1}>
                  {stat.icon}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {stat.label}
                </Typography>
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Highlights */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          ĐIỂM KHÁC BIỆT
        </Typography>
        <Grid container spacing={3}>
          {highlights.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Fade in timeout={300 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: `${item.color}20`,
                        mb: 2,
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        sx: { fontSize: 40, color: item.color },
                      })}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Before Learning */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <School sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            TRƯỚC KHI HỌC
          </Typography>
        </Box>
        <List>
          {beforeLearning.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ variant: 'body1' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* During Learning */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Support sx={{ fontSize: 40, color: 'success.main' }} />
          <Typography variant="h4" fontWeight="bold" color="success.main">
            TRONG QUÁ TRÌNH HỌC
          </Typography>
        </Box>
        {duringLearning.map((section, index) => (
          <Accordion key={index} defaultExpanded={index === 0} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" fontWeight="bold">
                {section.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {section.items.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* After Learning */}
      <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <CardGiftcard sx={{ fontSize: 40, color: 'error.main' }} />
          <Typography variant="h4" fontWeight="bold" color="error.main">
            SAU KHI HỌC
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {afterLearning.map((section, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {section.icon}
                    <Typography variant="h6" fontWeight="bold">
                      {section.category}
                    </Typography>
                  </Box>
                  <List dense>
                    {section.benefits.map((benefit, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Special Guarantee */}
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white" mb={2}>
          CAM KẾT ĐẦU RA
        </Typography>
        <Typography variant="h6" color="white" sx={{ opacity: 0.95, mb: 3 }}>
          Nếu học viên thi không đạt cam kết
        </Typography>
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
          <Chip
            label="HỌC LẠI MIỄN PHÍ"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              fontSize: '1.1rem',
              py: 3,
              px: 2,
              fontWeight: 'bold',
            }}
          />
          <Chip
            label="KHÔNG GIỚI HẠN SỐ LẦN"
            sx={{
              bgcolor: 'white',
              color: 'error.main',
              fontSize: '1.1rem',
              py: 3,
              px: 2,
              fontWeight: 'bold',
            }}
          />
          <Chip
            label="ĐẾN KHI ĐẠT MỤC TIÊU"
            sx={{
              bgcolor: 'white',
              color: 'success.main',
              fontSize: '1.1rem',
              py: 3,
              px: 2,
              fontWeight: 'bold',
            }}
          />
        </Box>
      </Paper>

      {/* Footer Note */}
      <Box textAlign="center" mt={6}>
        <Typography variant="body1" color="text.secondary">
          💡 <strong>Lưu ý:</strong> Mọi quyền lợi đều được ghi rõ trong hợp đồng học và được 
          trung tâm cam kết thực hiện đầy đủ
        </Typography>
      </Box>
    </Container>
  );
};

export default StudentBenefitsPage;
