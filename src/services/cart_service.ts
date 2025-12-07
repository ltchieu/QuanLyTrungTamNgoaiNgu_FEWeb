import { AxiosInstance } from "axios";
import { CartPreviewRequest, CartPreviewResponse } from "../model/cart_model";
import { ApiResponse } from "../model/api_respone";

export const previewCart = async (
  axiosPrivate: AxiosInstance,
  request: CartPreviewRequest
): Promise<CartPreviewResponse> => {
  const response = await axiosPrivate.post<ApiResponse<CartPreviewResponse>>(
    "/cart/preview",
    request
  );
  return response.data.data;
};
