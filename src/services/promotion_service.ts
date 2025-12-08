
import { axiosClient } from "../api/axios_client";
import { PromotionListResponse } from "../model/promotion_model";

const promotionService = {
  /**
   * Lấy danh sách các khuyến mãi đang hoạt động
   */
  getActivePromotions: async (): Promise<PromotionListResponse> => {
    try {
      const response = await axiosClient.get<PromotionListResponse>("/promotions/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching active promotions:", error);
      throw error;
    }
  },
};

export default promotionService;
