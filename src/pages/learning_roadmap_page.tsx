import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  TrendingUp,
  School,
  AutoStories,
  Headset,
  Chat,
  Edit,
  Timer,
  EmojiEvents,
} from '@mui/icons-material';

interface RoadmapPhase {
  phase: string;
  duration: string;
  targetScore: string;
  description: string;
  icon: React.ReactElement;
  skills: Array<{
    name: string;
    icon: React.ReactElement;
    content: string[];
    methods: string;
    resources: string[];
  }>;
}

const LearningRoadmapPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Giai đoạn 1: Xây dựng nền tảng',
      duration: '4-6 tháng',
      targetScore: 'Từ mất gốc lên 4.0-4.5',
      description: 'Tập trung vào các kiến thức cơ bản: ngữ pháp, từ vựng, phát âm và kỹ năng nghe-đọc cơ bản.',
      icon: <School />,
      skills: [
        {
          name: 'Ngữ pháp cơ bản',
          icon: <AutoStories />,
          content: [
            'Nhận biết các thành tố trong câu (chủ ngữ, vị ngữ, tân ngữ)',
            'Hiểu và sử dụng 5 thì cơ bản (hiện tại, quá khứ, tương lai, tiếp diễn, hoàn thành)',
            'Phân biệt câu đơn, câu ghép và câu phức',
            'Thực hành đặt câu và dịch câu để làm quen với cấu trúc',
          ],
          methods: 'Phương pháp TRUE Grammar - giúp phân tách nhanh các thành tố trong câu, đọc hiểu chính xác',
          resources: [
            'Grammar Practice for Elementary Students',
            'English Grammar in Use (Basic)',
            'Bài tập thực hành trên lớp',
          ],
        },
        {
          name: 'Listening cơ bản',
          icon: <Headset />,
          content: [
            'Làm quen với tiếng Anh giao tiếp thường ngày',
            'Luyện nghe với tốc độ chậm, độ dài 1-3 phút',
            'Phát triển khả năng nhận diện âm thanh và từ vựng',
            'Học cách nối âm, luyến âm trong tiếng Anh',
          ],
          methods: 'Listening Dictation - chép chính tả để hình thành liên kết âm thanh-văn bản',
          resources: [
            'Listening Practice Through Dictation',
            'Oxford Bookworms Audio',
            'English conversation podcasts',
          ],
        },
        {
          name: 'Reading cơ bản',
          icon: <AutoStories />,
          content: [
            'Đọc các bài ngắn, độ dài nửa trang A4',
            'Làm quen với văn phong tiếng Anh',
            'Xây dựng vốn từ vựng 3000+ từ cốt lõi',
            'Phát triển thói quen đọc hàng ngày',
          ],
          methods: 'Reading Translation - dịch và hiểu sâu từng câu chữ',
          resources: [
            'Oxford Bookworms Library',
            'Truyện song ngữ Anh-Việt',
            'Các bài đọc cơ bản',
          ],
        },
        {
          name: 'Speaking & Pronunciation',
          icon: <Chat />,
          content: [
            'Học phát âm chuẩn theo bảng IPA',
            'Sửa các lỗi phát âm phổ biến (thiếu s, ed)',
            'Luyện khẩu hình miệng đúng',
            'Phát âm từ, cụm từ và câu hoàn chỉnh',
          ],
          methods: 'Phonics - sửa khẩu hình và phát âm chuẩn',
          resources: [
            'Ship or Sheep (Ann Baker)',
            'English Pronunciation in Use',
            'Luyện tập với giáo viên',
          ],
        },
      ],
    },
    {
      phase: 'Giai đoạn 2: Làm quen với bài thi',
      duration: '5-7 tháng',
      targetScore: 'Từ 4.5 lên 5.5-6.0',
      description: 'Làm quen với format bài thi, học kỹ thuật làm bài và nâng cao kỹ năng Listening & Reading.',
      icon: <TrendingUp />,
      skills: [
        {
          name: 'Listening theo format thi',
          icon: <Headset />,
          content: [
            'Làm quen với 4 sections trong bài thi Listening',
            'Luyện nghe các chủ đề học thuật (Section 3, 4)',
            'Học các dạng câu hỏi: Multiple choice, Matching, Completion',
            'Phát triển kỹ năng dự đoán và bắt keywords',
          ],
          methods: 'Dictation + Kỹ thuật làm bài chuyên sâu',
          resources: [
            'Cambridge IELTS 10-18',
            'IELTS Practice Tests',
            'Các bài nghe học thuật (TED, The Economist)',
          ],
        },
        {
          name: 'Reading theo format thi',
          icon: <AutoStories />,
          content: [
            'Làm quen với bài đọc học thuật dài',
            'Học các dạng câu hỏi: T/F/NG, Heading, Summary',
            'Phát triển kỹ năng skimming và scanning',
            'Nâng cao vốn từ vựng học thuật (B2-C1)',
          ],
          methods: 'Reading Translation + TRUE Grammar + Kỹ thuật làm bài',
          resources: [
            'Cambridge IELTS 10-18',
            'Essential Guide to IELTS',
            'The Official Guide To IELTS',
          ],
        },
        {
          name: 'Kỹ thuật làm bài',
          icon: <School />,
          content: [
            'Quản lý thời gian hiệu quả',
            'Chiến lược trả lời từng dạng câu hỏi',
            'Cách đọc đề và tìm thông tin nhanh',
            'Tránh các bẫy phổ biến trong đề thi',
          ],
          methods: 'Hướng dẫn chi tiết từng dạng bài + Thực hành liên tục',
          resources: [
            'Tài liệu kỹ thuật làm bài của trung tâm',
            'Cambridge IELTS (giải đề)',
            'Mock tests định kỳ',
          ],
        },
      ],
    },
    {
      phase: 'Giai đoạn 3: Luyện thi chuyên sâu',
      duration: '6-9 tháng',
      targetScore: '6.0-6.5 lên 7.0+',
      description: 'Tập trung vào Writing & Speaking, duy trì Listening & Reading, và hoàn thiện toàn diện 4 kỹ năng.',
      icon: <EmojiEvents />,
      skills: [
        {
          name: 'Writing Task 1 & 2',
          icon: <Edit />,
          content: [
            'Học tư duy viết tiếng Anh học thuật',
            'Phát triển ý tưởng và lập luận logic',
            'Sử dụng từ vựng và cấu trúc nâng cao',
            'Luyện viết trong thời gian quy định',
          ],
          methods: 'Phương pháp PAW - Tư duy viết học thuật hiệu quả',
          resources: [
            'Cambridge IELTS Writing samples',
            'Bài mẫu band 7.0-8.0',
            'Chấm chữa bài 1-1 với giáo viên',
          ],
        },
        {
          name: 'Speaking Part 1, 2, 3',
          icon: <Chat />,
          content: [
            'Phát triển kỹ năng trả lời tự nhiên và logic',
            'Sử dụng từ vựng và cấu trúc đa dạng',
            'Luyện tập dưới áp lực thời gian',
            'Tự tin thể hiện quan điểm cá nhân',
          ],
          methods: 'Phương pháp SWITCH + Hệ tư duy Hook-Line-Sinker',
          resources: [
            'IELTS Speaking topics',
            'Luyện nói 1-1 với giáo viên',
            'Mock test Speaking định kỳ',
          ],
        },
        {
          name: 'Duy trì Reading & Listening',
          icon: <Headset />,
          content: [
            'Giải đề định kỳ để giữ độ nhạy bén',
            'Học sâu qua dictation và translation',
            'Mở rộng vốn từ vựng chuyên ngành',
            'Nâng cao tốc độ làm bài',
          ],
          methods: 'Kết hợp giải đề + Học sâu + Ôn luyện',
          resources: [
            'Cambridge IELTS (bộ mới nhất)',
            'Website luyện đề của trung tâm',
            'Tài liệu học thuật đa dạng',
          ],
        },
      ],
    },
    {
      phase: 'Giai đoạn 4: Nước rút & Thi thật',
      duration: '1-2 tháng',
      targetScore: 'Đạt mục tiêu cá nhân',
      description: 'Ôn tập tổng hợp, làm quen với tâm lý thi, và chuẩn bị sẵn sàng cho kỳ thi.',
      icon: <Timer />,
      skills: [
        {
          name: 'Chiến lược thi',
          icon: <EmojiEvents />,
          content: [
            'Ôn lại kiến thức và kỹ thuật đã học',
            'Làm full test định kỳ để duy trì phản xạ',
            'Quản lý thời gian và năng lượng',
            'Chuẩn bị tâm lý thi tốt nhất',
          ],
          methods: 'Mock tests + Mentoring 1-1 trước khi thi',
          resources: [
            'Đề thi thử full format',
            'Checklist chuẩn bị thi',
            'Hướng dẫn đăng ký thi',
          ],
        },
      ],
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Fade in timeout={500}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #f50057 30%, #ff9800 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LỘ TRÌNH HỌC NGOẠI NGỮ
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 900, mx: 'auto', mt: 2 }}>
            Từ mất gốc đến thành thạo - Lộ trình được thiết kế khoa học, phù hợp với mọi trình độ
          </Typography>
        </Box>
      </Fade>

      {/* Overview Timeline */}
      <Paper elevation={2} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          TỔNG QUAN LỘ TRÌNH
        </Typography>
        <Grid container spacing={2}>
          {roadmap.map((phase, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                elevation={activeStep === index ? 8 : 1}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  bgcolor: activeStep === index ? 'primary.main' : 'background.paper',
                  color: activeStep === index ? 'white' : 'text.primary',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                onClick={() => setActiveStep(index)}
              >
                <Box sx={{ fontSize: 40, mb: 1 }}>
                  {phase.icon}
                </Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  Giai đoạn {index + 1}
                </Typography>
                <Chip
                  label={phase.duration}
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: activeStep === index ? 'rgba(255,255,255,0.2)' : undefined,
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Detailed Roadmap */}
      <Stepper activeStep={activeStep} orientation="vertical">
        {roadmap.map((phase, index) => (
          <Step key={index} expanded>
            <StepLabel
              StepIconComponent={() => (
                <Box sx={{ fontSize: 32, color: 'primary.main' }}>
                  {phase.icon}
                </Box>
              )}
            >
              <Typography variant="h5" fontWeight="bold">
                {phase.phase}
              </Typography>
              <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                <Chip label={phase.duration} color="primary" size="small" />
                <Chip label={phase.targetScore} color="success" size="small" />
              </Box>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" color="text.secondary" mb={3} lineHeight={1.8}>
                {phase.description}
              </Typography>

              {phase.skills.map((skill, skillIndex) => (
                <Accordion key={skillIndex} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box display="flex" alignItems="center" gap={2}>
                      {skill.icon}
                      <Typography variant="h6" fontWeight="bold">
                        {skill.name}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" mb={1}>
                      Nội dung học:
                    </Typography>
                    <List dense>
                      {skill.content.map((item, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="subtitle2" fontWeight="bold" color="secondary" mt={2} mb={1}>
                      Phương pháp:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {skill.methods}
                    </Typography>

                    <Typography variant="subtitle2" fontWeight="bold" color="info.main" mb={1}>
                      Tài liệu khuyến nghị:
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {skill.resources.map((resource, i) => (
                        <Chip key={i} label={resource} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}

              {index < roadmap.length - 1 && (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(index + 1)}
                  sx={{ mt: 2 }}
                >
                  Tiếp tục giai đoạn {index + 2}
                </Button>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* CTA Section */}
      <Paper
        elevation={3}
        sx={{
          p: 5,
          mt: 8,
          borderRadius: 3,
          bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white" mb={2}>
          Sẵn sàng bắt đầu hành trình của bạn?
        </Typography>
        <Typography variant="body1" color="white" sx={{ opacity: 0.9, mb: 3 }}>
          Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục mục tiêu
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Đăng ký tư vấn miễn phí
        </Button>
      </Paper>
    </Container>
  );
};

export default LearningRoadmapPage;
