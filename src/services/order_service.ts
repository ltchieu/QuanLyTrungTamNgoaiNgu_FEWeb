import { AxiosInstance } from "axios";
import { ApiResponse } from "../model/api_respone";
import { OrderRequest, Invoice, CreatePaymentRequest, CreatePaymentResponse } from "../model/order_model";


export const createOrder = async (
  axiosPrivate: AxiosInstance,
  orderData: OrderRequest
): Promise<Invoice> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<Invoice>>(
      "/orders",
      orderData
    );

    if (response.data && response.data.code === 1000 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data?.message || "Đăng ký thất bại");
    }
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw error;
  }
};


export const createPaymentUrl = async (
  axiosPrivate: AxiosInstance,
  paymentData: CreatePaymentRequest
): Promise<CreatePaymentResponse> => {
  try {
    const response = await axiosPrivate.post<ApiResponse<CreatePaymentResponse>>(
      "/orders/payment/create",
      paymentData
    );

    if (response.data && response.data.code === 1000 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data?.message || "Tạo link thanh toán thất bại");
    }
  } catch (error: any) {
    console.error("Error creating payment URL:", error);
    throw error;
  }
};

export const getInvoice = async (
  axiosPrivate: AxiosInstance,
  invoiceId: number
): Promise<Invoice> => {
  try {
    const response = await axiosPrivate.get<ApiResponse<Invoice>>(
      `/orders/${invoiceId}`
    );

    if (response.data && response.data.code === 1000 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data?.message || "Không tìm thấy hóa đơn");
    }
  } catch (error: any) {
    console.error("Error fetching invoice:", error);
    throw error;
  }
};
