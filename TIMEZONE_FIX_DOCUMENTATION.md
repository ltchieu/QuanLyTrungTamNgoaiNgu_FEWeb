# Timezone Fix Documentation

## Vấn đề
Khi deploy frontend ở Singapore và backend ở Malaysia, việc sử dụng múi giờ local của browser (`new Date()`) gây ra sai lệch thời gian trong:
- Đếm ngược thời gian thanh toán VNPay (15 phút)
- Kiểm tra khuyến mãi hết hạn
- Hiển thị ngày tháng các sự kiện

## Giải pháp
Tạo utility functions để xử lý thời gian theo múi giờ Việt Nam (GMT+7):

### File mới: `src/utils/datetime.ts`
Chứa các functions:
- `getVietnamTime()`: Lấy thời gian hiện tại theo múi giờ Việt Nam
- `toVietnamTime()`: Chuyển đổi date string sang múi giờ Việt Nam
- `formatVietnamDate()`: Format ngày theo định dạng Việt Nam (dd/MM/yyyy)
- `formatVietnamDateTime()`: Format ngày giờ đầy đủ
- `getTimeDifferenceInSeconds()`: Tính khoảng cách thời gian
- `isExpired()`: Kiểm tra đã hết hạn chưa

## Các file đã được cập nhật

### 1. Payment Related (CRITICAL)
- ✅ **src/componets/invoice_modal.tsx**
  - Sử dụng `getVietnamTime()` để tính countdown 15 phút cho VNPay
  - Sử dụng `getTimeDifferenceInSeconds()` để tính thời gian còn lại chính xác

### 2. Promotion Related
- ✅ **src/componets/promotion_card.tsx**
  - Sử dụng `getVietnamTime()` để tính số ngày còn lại
  - Sử dụng `formatVietnamDate()` để hiển thị ngày
  
- ✅ **src/pages/promotion_page.tsx**
  - Filter promotion sắp hết hạn dựa trên múi giờ VN
  - Thống kê promotion hết hạn chính xác

### 3. Display Related
- ✅ **src/pages/registered_course_page.tsx**
  - Hiển thị ngày bắt đầu/kết thúc khóa học theo múi giờ VN
  
- ✅ **src/pages/course.tsx**
  - Hiển thị ngày khai giảng lớp học
  
- ✅ **src/pages/register_course.tsx**
  - Hiển thị ngày khai giảng khi đăng ký

## Lưu ý quan trọng

### 1. Backend phải trả về múi giờ Việt Nam
Backend nên cấu hình để trả về thời gian theo múi giờ Việt Nam (GMT+7) hoặc UTC có kèm timezone info.

### 2. Database timezone
Database nên lưu timestamps theo UTC và convert khi cần, hoặc lưu trực tiếp theo múi giờ VN với timezone info.

### 3. VNPay Payment Flow
```
1. Backend tạo invoice -> dateCreated (VN timezone)
2. Frontend nhận dateCreated -> Calculate expiry = dateCreated + 15 phút
3. Frontend countdown sử dụng getVietnamTime() thay vì new Date()
4. Khi redirect đến VNPay -> Time param phải là VN timezone
5. VNPay callback -> Verify time phải match VN timezone
```

## Testing
Test các trường hợp:
1. ✅ Tạo đơn hàng và kiểm tra countdown 15 phút
2. ✅ Promotion sắp hết hạn (< 7 ngày)
3. ✅ Hiển thị ngày tháng trên UI
4. 🔲 Deploy lên server khác timezone và test lại

## Migration từ code cũ
Thay thế:
```typescript
// OLD
const now = new Date();
const formatted = date.toLocaleDateString('vi-VN');

// NEW
import { getVietnamTime, formatVietnamDate } from '../utils/datetime';
const now = getVietnamTime();
const formatted = formatVietnamDate(date);
```

## Các API liên quan cần kiểm tra
- `/orders` (POST) - Tạo đơn hàng
- `/orders/payment/create` (POST) - Tạo link thanh toán VNPay
- `/orders/{invoiceId}` (GET) - Lấy thông tin hóa đơn
- Các API liên quan promotion

## Next Steps
1. Verify backend trả về đúng timezone
2. Test payment flow với VNPay production
3. Monitor logs để đảm bảo không còn time mismatch
4. Thêm timezone info vào logs để debug dễ hơn
