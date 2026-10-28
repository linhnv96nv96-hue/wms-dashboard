# WMS Dashboard

Dashboard quản lý kho hàng dựng bằng React + Vite + Recharts, sử dụng mock data.

## Chức năng
- Thẻ KPI: nhập kho, xuất kho, tồn kho, vòng quay tồn kho.
- Biểu đồ cột nhập/xuất theo tháng.
- Biểu đồ dòng hàng ròng.
- Biểu đồ tồn kho hàng lỗi.
- Bộ lọc thời gian, tìm kiếm, thông báo, chuyển trạng thái menu.
- Responsive cho desktop, tablet và mobile.

## Chạy ở máy cá nhân
Yêu cầu Node.js 18+.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal (thường là http://localhost:5173).

## Build kiểm tra
```bash
npm run build
npm run preview
```

## Đưa mã nguồn lên GitHub
1. Tạo repository mới trên GitHub, chọn **Public**.
2. Mở terminal trong thư mục dự án:
```bash
git init
git add .
git commit -m "Build WMS dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wms-dashboard.git
git push -u origin main
```
Thay `YOUR_USERNAME` bằng tên tài khoản GitHub của bạn.

## Deploy lên Vercel
1. Đăng nhập Vercel bằng GitHub.
2. Chọn **Add New → Project**, import repository `wms-dashboard`.
3. Framework preset: **Vite** (hoặc để tự nhận diện).
4. Build command: `npm run build`; Output directory: `dist`.
5. Nhấn **Deploy**. Sau khi build thành công, Vercel cung cấp URL công khai.

## Deploy lên Netlify (phương án khác)
Import repository vào Netlify, đặt Build command `npm run build`, Publish directory `dist`, sau đó Deploy.

> Dữ liệu hiện là mock data để trình bày giao diện. Chưa kết nối API/backend hoặc cơ sở dữ liệu thật.

## Deploy tự động bằng GitHub Pages
Project đã kèm workflow tại `.github/workflows/deploy.yml`. Sau khi đẩy code lên nhánh `main`:
1. Vào **Settings → Pages** của repository.
2. Ở **Build and deployment → Source**, chọn **GitHub Actions**.
3. Vào tab **Actions** và chờ workflow `Build and deploy WMS Dashboard to GitHub Pages` chạy thành công.
4. Website sẽ có địa chỉ dạng `https://YOUR_USERNAME.github.io/wms-dashboard/`.

Nếu dùng Vercel, có thể import cùng repository; cấu hình build `npm run build`, output `dist`.
