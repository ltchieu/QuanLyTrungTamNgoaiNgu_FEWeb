import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
} from "@mui/material";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import LockResetIcon from "@mui/icons-material/LockReset";
import { UserProfileResponse } from "../model/account";

// === MOCK DATA ===

// Mock data cho HỌC VIÊN
const mockStudentUser: UserProfileResponse = {
  taiKhoan: {
    maTaiKhoan: "TK_HV001",
    tenDangNhap: "minhanh123",
    vaiTro: "Học viên",
  },
  hocVienInfo: {
    maHocVien: "HV001",
    hoTen: "Trần Minh Anh",
    ngaySinh: "2002-10-15",
    gioiTinh: "Nữ",
    diaChi: "123 Nguyễn Văn Cừ, Quận 5, TP. HCM",
    soDienThoai: "0909123456",
    email: "minhanh.tran@email.com",
    ngheNghiep: "Sinh viên",
    trinhDo: "Đại học năm 3",
    anhDaiDien: "https://example.com/avatar/student.png",
  },
};

// Mock data cho GIẢNG VIÊN
const mockTeacherUser: UserProfileResponse = {
  taiKhoan: {
    maTaiKhoan: "TK_GV001",
    tenDangNhap: "gv.baotran",
    vaiTro: "Giảng Viên",
  },
  giangVienInfo: {
    maGiangVien: "GV001",
    hoTen: "Trần Quốc Bảo",
    ngaySinh: "1990-05-20",
    soDienThoai: "0988765432",
    email: "bao.tran@ipu.edu.vn",
    hinhAnh: "https://example.com/avatar/teacher.png",
    bangCap: [
      {
        ma: "BC001",
        tenLoaiBangCap: "Chứng chỉ IELTS",
        trinhDo: "IELTS 8.5",
      },
      {
        ma: "BC002",
        tenLoaiBangCap: "Bằng Thạc sĩ",
        trinhDo: "ThS. Ngôn ngữ Anh (ĐH Harvard)",
      },
    ],
  },
};

// Giả lập API
const fetchUserProfile = (
  role: "Học viên" | "Giảng Viên"
): Promise<UserProfileResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Thay đổi ở đây để test 2 vai trò
      if (role === "Học viên") {
        resolve(mockStudentUser);
      } else {
        resolve(mockTeacherUser);
      }
    }, 1000);
  });
};

const ManageAccountPage: React.FC = () => {
  // Giả sử bạn lấy vai trò từ useAuth()
  const [role, setRole] = useState<"Học viên" | "Giảng Viên">("Học viên");

  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const data = await fetchUserProfile(role);
        setUserProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [role]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  // Lấy thông tin chung
  const info = userProfile?.hocVienInfo || userProfile?.giangVienInfo;
  const hoTen = info?.hoTen || "Đang tải...";
  const giangVienInfo = userProfile?.giangVienInfo;
  const bangCap = giangVienInfo?.bangCap || [];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userProfile || !info) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">
          Không thể tải thông tin tài khoản.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* === CỘT TRÁI: AVATAR & TÀI KHOẢN === */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              {hoTen}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Vai trò: {userProfile.taiKhoan.vaiTro}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="600" align="left">
              Tài khoản
            </Typography>
            <TextField
              label="Tên đăng nhập"
              value={userProfile.taiKhoan.tenDangNhap}
              fullWidth
              disabled
              sx={{ mt: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<LockResetIcon />}
              fullWidth
              sx={{ mt: 1.5 }}
            >
              Đổi mật khẩu
            </Button>
          </Paper>
        </Grid>

        {/* === CỘT PHẢI: THÔNG TIN CHI TIẾT === */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader
              title="Thông tin chi tiết"
              action={
                <Button onClick={handleEditToggle}>
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </Button>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {/* --- Thông tin chung --- */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Họ và tên"
                    defaultValue={info.hoTen}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <BadgeIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Ngày sinh"
                    defaultValue={info.ngaySinh}
                    type="date"
                    fullWidth
                    disabled={!isEditing}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <CakeIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    defaultValue={info.email}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Số điện thoại"
                    defaultValue={info.soDienThoai}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* --- Thông tin RIÊNG CỦA HỌC VIÊN --- */}
                {userProfile.hocVienInfo && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Giới tính"
                        defaultValue={userProfile.hocVienInfo.gioiTinh}
                        fullWidth
                        disabled={!isEditing}
                        select
                        InputProps={{
                          startAdornment: (
                            <WcIcon sx={{ mr: 1, color: "action.active" }} />
                          ),
                        }}
                      >
                        <MenuItem value="Nam">Nam</MenuItem>
                        <MenuItem value="Nữ">Nữ</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Nghề nghiệp"
                        defaultValue={userProfile.hocVienInfo.ngheNghiep}
                        fullWidth
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <WorkIcon sx={{ mr: 1, color: "action.active" }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Địa chỉ"
                        defaultValue={userProfile.hocVienInfo.diaChi}
                        fullWidth
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <HomeIcon sx={{ mr: 1, color: "action.active" }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Trình độ (học vấn)"
                        defaultValue={userProfile.hocVienInfo.trinhDo}
                        fullWidth
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: (
                            <SchoolIcon
                              sx={{ mr: 1, color: "action.active" }}
                            />
                          ),
                        }}
                      />
                    </Grid>
                  </>
                )}

                {/* --- Thông tin RIÊNG CỦA GIẢNG VIÊN --- */}
                {giangVienInfo && (
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{ mt: 2, mb: 1 }}
                    >
                      Bằng cấp chuyên môn
                    </Typography>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        border: "1px solid #ddd",
                        borderRadius: 2,
                      }}
                    >
                      {bangCap.map((bc, index) => (
                        <React.Fragment key={bc.ma}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <BadgeIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={bc.trinhDo}
                              secondary={bc.tenLoaiBangCap}
                            />
                          </ListItem>
                          {index < bangCap.length - 1 && (
                            <Divider component="li" />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Grid>
                )}

                {/* Nút Lưu */}
                {isEditing && (
                  <Grid size={{ xs: 12 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleEditToggle}
                    >
                      Lưu thay đổi
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageAccountPage;
