import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import LockResetIcon from "@mui/icons-material/LockReset";
import { getStudentInfo, updateStudentInfo } from "../services/user_service";
import useAxiosPrivate from "../hook/useAxiosPrivate"; // Hook bảo mật
import { useAuth } from "../hook/useAuth";
import { StudentInfoResponse } from "../model/student";

const ManageAccountPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  // State lưu dữ liệu thật từ API
  const [studentInfo, setStudentInfo] = useState<StudentInfoResponse | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch Data khi component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStudentInfo(axiosPrivate);
        setStudentInfo(data);
      } catch (err: any) {
        console.error(err);
        setError("Không thể tải thông tin tài khoản. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken) {
      fetchData();
    }
  }, [auth?.accessToken, axiosPrivate]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset changes if canceling (optional, currently just toggles)
      // To implement reset, we'd need a separate state for original data
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof StudentInfoResponse, value: any) => {
    if (studentInfo) {
      setStudentInfo({ ...studentInfo, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!studentInfo) return;
    try {
      await updateStudentInfo(axiosPrivate, studentInfo);
      setSuccessMessage("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      setError("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  // Helper map giới tính (Boolean -> String)
  const getGenderValue = (gender: boolean) => (gender ? "true" : "false");

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!studentInfo) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Grid container spacing={3}>
        {/* === CỘT TRÁI: AVATAR & TÀI KHOẢN === */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
            <Avatar
              src={studentInfo.image} // Nếu là URL ảnh
              alt={studentInfo.name}
              sx={{ width: 100, height: 100, mx: "auto", mb: 2, fontSize: 40 }}
            >
              {studentInfo.name.charAt(0)}
            </Avatar>

            <Typography variant="h5" fontWeight="bold">
              {studentInfo.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Vai trò: Học viên
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="600" align="left">
              Tài khoản
            </Typography>
            <TextField
              label="Email đăng nhập"
              value={studentInfo.email}
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
              title="Thông tin cá nhân"
              action={
                <Button onClick={handleEditToggle}>
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </Button>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {/* Họ tên */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Họ và tên"
                    value={studentInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <BadgeIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Ngày sinh */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Ngày sinh"
                    value={studentInfo.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
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

                {/* Email */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Email"
                    value={studentInfo.email}
                    fullWidth
                    disabled // Email thường là định danh, không cho sửa
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* SĐT */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Số điện thoại"
                    value={studentInfo.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Giới tính */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Giới tính"
                    value={getGenderValue(studentInfo.gender)}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value === "true")
                    }
                    fullWidth
                    disabled={!isEditing}
                    select
                    InputProps={{
                      startAdornment: (
                        <WcIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  >
                    <MenuItem value="true">Nam</MenuItem>
                    <MenuItem value="false">Nữ</MenuItem>
                  </TextField>
                </Grid>

                {/* Nghề nghiệp */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Nghề nghiệp"
                    value={studentInfo.jobs}
                    onChange={(e) => handleInputChange("jobs", e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <WorkIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Địa chỉ */}
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Địa chỉ"
                    value={studentInfo.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <HomeIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Nút Lưu */}
                {isEditing && (
                  <Grid size={{ xs: 12 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSave}
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