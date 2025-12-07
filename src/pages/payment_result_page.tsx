import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Receipt,
} from '@mui/icons-material';

const PaymentResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const status = searchParams.get('status');
  const invoiceId = searchParams.get('invoiceId');
  const transactionNo = searchParams.get('transactionNo');
  const amount = searchParams.get('amount');
  const error = searchParams.get('error');
  const responseCode = searchParams.get('responseCode');

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  const isSuccess = status === 'success';

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        {isSuccess ? (
          <>
            <CheckCircle
              sx={{
                fontSize: 100,
                color: 'success.main',
                mb: 3,
              }}
            />
            <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
              Thanh toán thành công!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Cảm ơn bạn đã đăng ký khóa học. Chúng tôi đã nhận được thanh toán của bạn.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'left', maxWidth: 500, mx: 'auto' }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Mã hóa đơn:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  #{invoiceId}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Mã giao dịch:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {transactionNo}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Số tiền:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="success.main">
                  {parseFloat(amount || '0').toLocaleString('vi-VN')} VND
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/student/registered-courses')}
                startIcon={<Receipt />}
              >
                Xem khóa học của tôi
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/')}
              >
                Về trang chủ
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Cancel
              sx={{
                fontSize: 100,
                color: 'error.main',
                mb: 3,
              }}
            />
            <Typography variant="h4" fontWeight="bold" color="error.main" gutterBottom>
              Thanh toán thất bại
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {decodeURIComponent(error || 'Có lỗi xảy ra trong quá trình thanh toán')}
            </Typography>

            {responseCode && (
              <Alert severity="error" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                <Typography variant="body2">
                  Mã lỗi: <strong>{responseCode}</strong>
                </Typography>
              </Alert>
            )}

            {invoiceId && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Mã hóa đơn: #{invoiceId}
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register-course')}
                color="primary"
              >
                Thử lại
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/')}
              >
                Về trang chủ
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentResultPage;
