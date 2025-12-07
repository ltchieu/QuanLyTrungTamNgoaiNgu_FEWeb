// Order/Invoice models based on ORDER_API_DOCUMENTATION.md

export interface OrderRequest {
  studentId: number;
  classIds: number[];
  paymentMethodId: number;
}

export interface OrderDetail {
  detailId: number;
  courseName: string;
  className: string;
  finalAmount: number;
}

export interface Invoice {
  invoiceId: number;
  dateCreated: string;
  status: boolean; // false = chưa thanh toán, true = đã thanh toán
  studentName: string;
  studentId: string; // Mã học viên (string)
  paymentMethod: string;
  totalOriginalPrice: number;
  courseDiscountPercent: number;
  courseDiscountAmount: number;
  comboDiscountPercent: number;
  comboDiscountAmount: number;
  returningDiscountPercent: number;
  returningDiscountAmount: number;
  totalDiscountPercent: number;
  totalDiscountAmount: number;
  totalAmount: number;
  details: OrderDetail[];
}

export interface CreatePaymentRequest {
  invoiceId: number;
  amount: string;
  orderInfo: string;
}

export interface CreatePaymentResponse {
  txnRef: string;
  amount: number;
  payUrl: string;
}

export interface PaymentResultParams {
  status: 'success' | 'failed';
  invoiceId?: string;
  transactionNo?: string;
  amount?: string;
  responseCode?: string;
  error?: string;
}
