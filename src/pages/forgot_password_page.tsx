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
  Link as MuiLink,
} from "@mui/material";
import { useState } from "react";
import { forgotPasswordService } from "../services/auth_service";
import { useNavigate } from "react-router-dom";
import { EmailOutlined, ArrowBack } from "@mui/icons-material";

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

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");

  // Validate email format
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email không được để trống");
      return false;
    }
    
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email không hợp lệ");
      return false;
    }
    
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate email
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);

    try {
      await forgotPasswordService(email);
      setSuccessMessage(
        "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn (có hiệu lực trong 2 phút)."
      );
      setEmail("");
    } catch (err: any) {
      console.error("Forgot password error:", err);
      
      if (err.response?.status === 404) {
        setErrorMessage("Email không tồn tại trong hệ thống");
      } else {
        setErrorMessage(
          err.response?.data?.message || 
          "Có lỗi xảy ra. Vui lòng thử lại sau."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
    if (errorMessage) {
      setErrorMessage(null);
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
            {/* Back button */}
            <Box sx={{ mb: 2 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/login")}
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "primary.main",
                  },
                }}
              >
                Quay lại đăng nhập
              </Button>
            </Box>

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
                <EmailOutlined sx={{ fontSize: 40, color: "white" }} />
              </Box>

              <Typography variant="h1" sx={{ mb: 1, textAlign: "center" }}>
                Quên mật khẩu?
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", maxWidth: 400 }}
              >
                Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn link để
                đặt lại mật khẩu.
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
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                disabled={loading}
                autoFocus
                sx={{ mb: 2 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading || !email}
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
                  "Gửi link đặt lại mật khẩu"
                )}
              </Button>
            </form>

            {/* Additional info */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Link đặt lại mật khẩu sẽ có hiệu lực trong{" "}
                <strong>2 phút</strong>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
