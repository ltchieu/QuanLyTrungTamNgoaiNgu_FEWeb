import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Receipt,
  AccessTime,
  School,
  Discount,
} from '@mui/icons-material';
import { Invoice } from '../model/order_model';

interface InvoiceModalProps {
  open: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onPayment: (invoiceId: number, amount: number) => void;
  paying: boolean;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  open,
  invoice,
  onClose,
  onPayment,
  paying,
}) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!invoice || !open) {
      setTimeLeft(15 * 60);
      setExpired(false);
      return;
    }

    // Calculate expiry time = dateCreated + 15 minutes
    const createdTime = new Date(invoice.dateCreated);
    const expiryTime = new Date(createdTime.getTime() + 15 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date();
      const seconds = Math.floor((expiryTime.getTime() - now.getTime()) / 1000);

      if (seconds <= 0) {
        setTimeLeft(0);
        setExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft(seconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [invoice, open]);

  if (!invoice) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (15 * 60)) * 100;

  const handlePayment = () => {
    if (!expired && !paying) {
      onPayment(invoice.invoiceId, invoice.totalAmount);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <Receipt fontSize="large" color="primary" />
          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold">
              Hóa đơn #{invoice.invoiceId}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {invoice.studentName} - {invoice.studentId}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        {/* Countdown Timer */}
        <Alert
          severity={expired ? 'error' : timeLeft < 300 ? 'warning' : 'info'}
          icon={<AccessTime />}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2" fontWeight="bold">
            {expired
              ? '⚠️ Hóa đơn đã hết hạn!'
              : `⏱️ Thời gian còn lại: ${minutes}:${seconds.toString().padStart(2, '0')}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ mt: 1, height: 6, borderRadius: 1 }}
            color={expired ? 'error' : timeLeft < 300 ? 'warning' : 'info'}
          />
        </Alert>

        {/* Course Details */}
        <Box mb={3}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            <School fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Các lớp học đã đăng ký:
          </Typography>
          {invoice.details.map((detail, index) => (
            <Box
              key={detail.detailId}
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
                mb: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {index + 1}. {detail.courseName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {detail.className}
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main" sx={{ mt: 1 }}>
                {detail.finalAmount.toLocaleString('vi-VN')} VND
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Discount Information */}
        {(invoice.courseDiscountAmount > 0 ||
          invoice.comboDiscountAmount > 0 ||
          invoice.returningDiscountAmount > 0) && (
          <Box mb={3}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              <Discount fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Ưu đãi áp dụng:
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: 'success.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'success.200',
              }}
            >
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Giá gốc:</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {invoice.totalOriginalPrice.toLocaleString('vi-VN')} VND
                </Typography>
              </Box>

              {invoice.courseDiscountAmount > 0 && (
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="success.main">
                    Giảm khóa học ({invoice.courseDiscountPercent}%):
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    -{invoice.courseDiscountAmount.toLocaleString('vi-VN')} VND
                  </Typography>
                </Box>
              )}

              {invoice.comboDiscountAmount > 0 && (
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="success.main">
                    Giảm combo ({invoice.comboDiscountPercent}%):
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    -{invoice.comboDiscountAmount.toLocaleString('vi-VN')} VND
                  </Typography>
                </Box>
              )}

              {invoice.returningDiscountAmount > 0 && (
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="success.main">
                    Giảm HV cũ ({invoice.returningDiscountPercent}%):
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    -{invoice.returningDiscountAmount.toLocaleString('vi-VN')} VND
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                  Tổng cộng:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  {invoice.totalAmount.toLocaleString('vi-VN')} VND
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Payment Method */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Phương thức thanh toán:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {invoice.paymentMethod}
          </Typography>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined" size="large">
          Đóng
        </Button>
        <Button
          onClick={handlePayment}
          variant="contained"
          size="large"
          disabled={expired || paying}
          startIcon={paying ? <CircularProgress size={20} /> : null}
        >
          {paying ? 'Đang xử lý...' : 'Thanh toán ngay'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
