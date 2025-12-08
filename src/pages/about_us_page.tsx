import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Fade,
  Card,
  CardContent,
  Avatar,
  Chip,
  Grid
} from '@mui/material';
import {
  School,
  EmojiEvents,
  Groups,
  Verified,
  TrendingUp,
  Star,
} from '@mui/icons-material';

const AboutUsPage: React.FC = () => {
  const stats = [
    { icon: <School />, number: '10+', label: 'Năm kinh nghiệm', color: 'primary.main' },
    { icon: <Groups />, number: '5000+', label: 'Học viên', color: 'success.main' },
    { icon: <EmojiEvents />, number: '95%', label: 'Đạt mục tiêu', color: 'error.main' },
    { icon: <Verified />, number: '50+', label: 'Giảng viên', color: 'warning.main' },
  ];

  const methods = [
    {
      name: 'Phương pháp TRUE Grammar',
      description: 'Giúp phân tách nhanh chóng các thành tố trong câu, đọc hiểu mọi văn bản tiếng Anh một cách chính xác và hiệu quả.',
      icon: '📚',
    },
    {
      name: 'Phương pháp PAW',
      description: 'Tư duy viết học thuật giúp bạn viết bài Writing chuẩn chỉnh với cấu trúc rõ ràng và logic mạch lạc.',
      icon: '✍️',
    },
    {
      name: 'Phương pháp SWITCH',
      description: 'Giúp phần thi Speaking trở nên lưu loát và tự nhiên hơn với kỹ thuật triển khai ý tưởng hiệu quả.',
      icon: '🎤',
    },
    {
      name: 'Listening Dictation',
      description: 'Luyện nghe qua chép chính tả giúp hình thành liên kết giữa âm thanh và ý nghĩa, cải thiện khả năng nghe hiểu.',
      icon: '🎧',
    },
  ];

  const teachers = [
    { name: 'Thầy Nguyễn Văn A', level: 'IELTS 8.5', specialty: 'Speaking & Writing' },
    { name: 'Cô Trần Thị B', level: 'IELTS 8.0', specialty: 'Reading & Listening' },
    { name: 'Thầy Lê Văn C', level: 'IELTS 8.5', specialty: 'Grammar & Vocabulary' },
    { name: 'Cô Phạm Thị D', level: 'IELTS 8.0', specialty: 'All Skills' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Fade in timeout={500}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            VỀ TRUNG TÂM CHÚNG TÔI
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
            Đồng hành cùng bạn trên hành trình chinh phục mục tiêu ngoại ngữ
          </Typography>
        </Box>
      </Fade>

      {/* Statistics */}
      <Grid container spacing={3} mb={8}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={index}>
            <Fade in timeout={300 + index * 100}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}20`,
                    mb: 2,
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    sx: { fontSize: 40, color: stat.color },
                  })}
                </Box>
                <Typography variant="h3" fontWeight="bold" color={stat.color}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  {stat.label}
                </Typography>
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Mission & Vision */}
      <Paper elevation={2} sx={{ p: 5, mb: 8, borderRadius: 3 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4" fontWeight="bold" color="primary.main">
                SỨ MỆNH
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              Chúng tôi cam kết mang đến chương trình đào tạo ngoại ngữ chất lượng cao, 
              giúp học viên không chỉ đạt được chứng chỉ mục tiêu mà còn sử dụng thành thạo 
              tiếng Anh trong học tập và công việc. Với đội ngũ giảng viên giàu kinh nghiệm 
              và phương pháp giảng dạy hiện đại, chúng tôi đồng hành cùng bạn trên mọi chặng 
              đường.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Star sx={{ fontSize: 40, color: 'warning.main' }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                TẦM NHÌN
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
              Trở thành trung tâm ngoại ngữ hàng đầu với hệ thống giảng dạy chuẩn quốc tế, 
              được tin tưởng bởi hàng nghìn học viên. Chúng tôi không ngừng nghiên cứu và 
              phát triển các phương pháp học tập hiệu quả, giúp rút ngắn thời gian học mà 
              vẫn đảm bảo chất lượng đầu ra cao nhất.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Teaching Methods */}
      <Box mb={8}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
          PHƯƠNG PHÁP GIẢNG DẠY ĐỘC QUYỀN
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={5}>
          Được nghiên cứu và phát triển bởi đội ngũ chuyên gia giàu kinh nghiệm
        </Typography>

        <Grid container spacing={3}>
          {methods.map((method, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Fade in timeout={300 + index * 150}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Typography variant="h2">{method.icon}</Typography>
                      <Typography variant="h5" fontWeight="bold" color="primary.main">
                        {method.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                      {method.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 8 }} />

      {/* Teachers */}
      <Box>
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
          ĐỘI NGŨ GIẢNG VIÊN
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={5}>
          Giảng viên trình độ cao, tận tâm và giàu kinh nghiệm
        </Typography>

        <Grid container spacing={4}>
          {teachers.map((teacher, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Fade in timeout={300 + index * 100}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: 40,
                    }}
                  >
                    {teacher.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {teacher.name}
                  </Typography>
                  <Chip
                    label={teacher.level}
                    color="error"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {teacher.specialty}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body1" color="text.secondary">
            Và nhiều giảng viên khác với trình độ IELTS 8.0+ cùng chứng chỉ giảng dạy quốc tế
          </Typography>
        </Box>
      </Box>

      {/* Core Values */}
      <Paper elevation={2} sx={{ p: 5, mt: 8, borderRadius: 3, bgcolor: 'primary.main' }}>
        <Typography variant="h4" fontWeight="bold" color="white" textAlign="center" mb={4}>
          GIÁ TRỊ CỐT LÕI
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: 'Chất lượng', desc: 'Cam kết chất lượng giảng dạy cao nhất' },
            { title: 'Tận tâm', desc: 'Đồng hành và hỗ trợ tận tình học viên' },
            { title: 'Đổi mới', desc: 'Không ngừng cải tiến phương pháp giảng dạy' },
            { title: 'Hiệu quả', desc: 'Tối ưu thời gian và chi phí cho học viên' },
          ].map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box textAlign="center" color="white">
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {value.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AboutUsPage;
