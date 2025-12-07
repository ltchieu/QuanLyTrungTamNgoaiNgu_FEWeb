import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  CssBaseline,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { resetPasswordService, forgotPasswordService } from "../services/auth_service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF4B2B",
    },
    secondary: {
      main: "#FF416C",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    button: {
      textTransform: "uppercase",
      fontWeight: "bold",
      letterSpacing: "1px",
      fontSize: "12px",
    },
    h1: {
      fontWeight: "bold",
      margin: 0,
      fontSize: "2rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "12px 45px",
          transition: "transform 80ms ease-in",
          "&:active": {
            transform: "scale(0.95)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        margin: "dense",
      },
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            backgroundColor: "#eee",
            borderRadius: 8,
            "&:before, &:after": {
              borderBottom: "none",
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
          },
        },
      },
    },
  },
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isCodeExpired, setIsCodeExpired] = useState<boolean>(false);
  const [resendingCode, setResendingCode] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (!codeFromUrl) {
      setErrorMessage("Link không hợp lệ hoặc đã hết hạn");
    } else {
      setCode(codeFromUrl);
    }
  }, [searchParams]);

  // Validate password
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
      return false;
    }

    setPasswordError("");
    return true;
  };

  // Validate confirm password
  const validateConfirmPassword = (confirmPwd: string): boolean => {
    if (!confirmPwd) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu");
      return false;
    }

    if (confirmPwd !== password) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate inputs
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    if (!code) {
      setErrorMessage("Link không hợp lệ hoặc đã hết hạn");
      return;
    }

    setLoading(true);

    try {
      await resetPasswordService(code, password, confirmPassword);
      setSuccessMessage("Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...");
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Reset password error:", err);

      if (err.response?.status === 400 || err.response?.status === 410) {
        // Code hết hạn hoặc không hợp lệ
        setIsCodeExpired(true);
        setErrorMessage("Link đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu link mới.");
      } else {
        setErrorMessage(
          err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (passwordError) {
      setPasswordError("");
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (confirmPasswordError) {
      setConfirmPasswordError("");
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleResendRequest = async () => {
    if (!userEmail) {
      // Nếu chưa có email, chuyển về trang forgot password
      navigate("/forgot-password");
      return;
    }

    setResendingCode(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await forgotPasswordService(userEmail);
      setSuccessMessage(
        "Email đặt lại mật khẩu mới đã được gửi. Vui lòng kiểm tra hộp thư của bạn."
      );
      setIsCodeExpired(false);
    } catch (err: any) {
      console.error("Resend error:", err);
      setErrorMessage(
        err.response?.data?.message || "Không thể gửi lại email. Vui lòng thử lại sau."
      );
    } finally {
      setResendingCode(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #FF416C, #FF4B2B)",
          padding: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            maxWidth: 500,
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 4 }}>
            {/* Icon and title */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF416C, #FF4B2B)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <LockOutlined sx={{ fontSize: 40, color: "white" }} />
              </Box>

              <Typography variant="h1" sx={{ mb: 1, textAlign: "center" }}>
                Đặt lại mật khẩu
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", maxWidth: 400 }}
              >
                Nhập mật khẩu mới của bạn bên dưới
              </Typography>
            </Box>

            {/* Success message */}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                {successMessage}
              </Alert>
            )}

            {/* Error message */}
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {/* Form */}
            {!successMessage && code && !isCodeExpired && (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Mật khẩu mới"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError || "Mật khẩu phải có ít nhất 8 ký tự"}
                  disabled={loading}
                  autoFocus
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError}
                  disabled={loading}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                /> 

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading || !password || !confirmPassword}
                  sx={{
                    mb: 2,
                    py: 1.5,
                    background: loading
                      ? "#ccc"
                      : "linear-gradient(to right, #FF416C, #FF4B2B)",
                    "&:hover": {
                      background: "linear-gradient(to right, #FF416C, #FF4B2B)",
                      opacity: 0.9,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Đặt lại mật khẩu"
                  )}
                </Button>
              </form>
            )}

            {/* Resend form when code expired */}
            {isCodeExpired && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
                  Nhập email của bạn để nhận link đặt lại mật khẩu mới:
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  disabled={resendingCode}
                  sx={{ mb: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleResendRequest}
                  disabled={resendingCode || !userEmail}
                  sx={{
                    py: 1.5,
                    background: resendingCode
                      ? "#ccc"
                      : "linear-gradient(to right, #FF416C, #FF4B2B)",
                    "&:hover": {
                      background: "linear-gradient(to right, #FF416C, #FF4B2B)",
                      opacity: 0.9,
                    },
                  }}
                >
                  {resendingCode ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Gửi lại link đặt lại mật khẩu"
                  )}
                </Button>
              </Box>
            )}

            {/* Link back to forgot password */}
            {!code && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  onClick={() => navigate("/forgot-password")}
                  sx={{
                    textTransform: "none",
                    color: "primary.main",
                  }}
                >
                  Yêu cầu link mới
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;
