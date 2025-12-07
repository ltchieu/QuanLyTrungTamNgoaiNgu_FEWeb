export interface CartPreviewRequest {
  courseClassIds: number[];
}

export interface CartItemResponse {
  courseClassId: number;
  courseName: string;
  className: string;
  originalPrice: number;
  finalPrice: number;
}

export interface ComboDiscountInfo {
  comboName: string;
  discountPercent: number;
  discountAmount: number;
  courseNames: string[];
}

export interface CartSummaryResponse {
  totalOriginalPrice: number;
  appliedCombos: ComboDiscountInfo[];
  returningDiscountAmount: number;
  totalDiscountAmount: number;
  finalAmount: number;
}

export interface CartPreviewResponse {
  items: CartItemResponse[];
  summary: CartSummaryResponse;
}
