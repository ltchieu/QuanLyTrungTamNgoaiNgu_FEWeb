import {
  faFacebook,
  faGooglePlusG,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  CssBaseline,
  IconButton,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoginRequest, SignupRequest } from "../model/auth_model";
import { useAuth } from "../hook/useAuth";
import {
  loginService,
  resendVerificationEmail,
  signupService,
} from "../services/auth_service";
import { useNavigate } from "react-router-dom";

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
          "& .MuiInputLabel-root": {
            // color: '#888',
          },
        },
      },
    },
  },
});

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [signupValue, setSignupValue] = useState<SignupRequest>({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isEnableLoginBtn, setIsEnableLoginBtn] = useState<boolean>(false);
  const [isEnableSignupBtn, setEnableSignupBtn] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showResendButton, setShowResendButton] = useState<boolean>(false);
  // State loading cho nút Resend
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isSuccess === true) {
      timerId = setTimeout(() => {
        setShowResendButton(true);
      }, 120 * 1000);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isSuccess]);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (isSignUpActive) {
      // --- Nếu đang ở form Đăng ký ---
      setSignupValue((prevData) => {
        const newData = { ...prevData, [name]: value };

        // Kiểm tra xem tất cả field trong newData có giá trị không
        const allFilled = Object.values(newData).every(
          (val) => val !== "" && val !== null && val !== undefined
        );

        setEnableSignupBtn(allFilled);
        return newData;
      });
    } else {
      //Nếu đang ở form Đăng nhập
      setLoginValue((prevData) => {
        const newData = { ...prevData, [name]: value };

        // Kiểm tra xem tất cả field trong newData có giá trị không
        const allFilled = Object.values(newData).every(
          (val) => val !== "" && val !== null && val !== undefined
        );

        setIsEnableLoginBtn(allFilled);
        return newData;
      });
    }
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn reload trang
    setLoading(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      //Gọi Service (Đã cấu hình withCredentials)
      const data = await loginService(loginValue);

      //Lấy dữ liệu trả về (Access Token & Info)
      const accessToken = data?.accessToken;
      const role = data?.role;
      const userId = data?.userId; 

      //Lưu vào Context
      setAuth({ userId, role, accessToken });

      //Chuyển hướng
      navigate("/", { replace: true });

    } catch (err: any) {
      const backendMessage = err.message;
      setErrorMessage(backendMessage || "Đăng nhập thất bại.");
      console.log("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    setIsSuccess(false);
    setErrorMessage(null);
    setShowResendButton(false); // Reset nút resend khi submit lại
    setResendMessage(null);
    try {
      await signupService(signupValue);
      setIsSuccess(true);
    } catch (err: any) {
      const backendMessage = err.response?.data?.message;

      setErrorMessage(
        backendMessage || err.message || "Đã xảy ra lỗi không xác định."
      );

      console.log("Signup failed:", err.response?.data || err);
      setIsSuccess(false);
    }
  };

  const handleResendEmail = async () => {
    if (!signupValue.email) {
      // Cần email từ form đăng ký
      setResendMessage("Không tìm thấy email để gửi lại.");
      return;
    }
    setIsResending(true);
    setResendMessage(null);
    try {
      await resendVerificationEmail(signupValue.email, "EMAIL_VERIFICATION");
      setResendMessage("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư.");
      setShowResendButton(false);
    } catch (error: any) {
      console.error(
        "Resend email error:",
        error.response?.data || error.message
      );
      setResendMessage(
        error.response?.data?.message ||
          "Gửi lại email thất bại. Vui lòng thử lại sau."
      );
    } finally {
      setIsResending(false);
    }
  };

  const transition = theme.transitions.create(["all"], {
    duration: theme.transitions.duration.standard * 1.5,
    easing: theme.transitions.easing.easeInOut,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        elevation={5}
        sx={{
          position: "relative",
          overflow: "hidden",
          width: 800,
          maxWidth: "100%",
          minHeight: 500,
          borderRadius: 3,
          margin: "auto",
          top: 70,
        }}
      >
        {/* Sign Up Container */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            height: "100%",
            left: 0,
            width: "50%",
            opacity: isSignUpActive ? 1 : 0,
            transform: isSignUpActive ? "translateX(100%)" : "translateX(0)",
            zIndex: isSignUpActive ? 5 : 1,
            transition: transition,
            animation: isSignUpActive ? `show 0.6s` : "none",
            "@keyframes show": {
              "0%, 49.99%": { opacity: 0, zIndex: 1 },
              "50%, 100%": { opacity: 1, zIndex: 5 },
            },
          }}
        >
          <Box /* ... Sign Up form elements ... */>
            <Typography
              variant="h1"
              gutterBottom
              sx={{ mt: 2, color: theme.palette.secondary.main }}
            >
              Create Account
            </Typography>
            <Box sx={{ margin: "20px 0" }}>
              {/* Social Icons */}
              <IconButton
                size="small"
                sx={{ border: "1px solid #DDDDDD", m: "0 5px" }}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ border: "1px solid #DDDDDD", m: "0 5px" }}
              >
                <FontAwesomeIcon icon={faGooglePlusG} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ border: "1px solid #DDDDDD", m: "0 5px" }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
              or use your email
            </Typography>
            <TextField
              onChange={handleChange}
              name="phoneNumber"
              label="SDT"
              type="text"
              sx={{ width: "90%" }}
            />
            <TextField
              onChange={handleChange}
              name="email"
              label="Email"
              type="email"
              sx={{ width: "90%" }}
            />
            <TextField
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              sx={{ width: "90%" }}
            />
            <Button
              disabled={!isEnableSignupBtn}
              onClick={handleSignupSubmit}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ mt: 2, mb: 1 }}>
            {isSuccess === true ? (
              showResendButton ? (
                // Hiển thị nút Resend sau 2 phút
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1" color="textSecondary">
                    Chưa nhận được email?
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleResendEmail}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Gửi lại email"
                    )}
                  </Button>
                </Box>
              ) : resendMessage ? null : (
                // Hiển thị thông báo thành công ban đầu
                <Typography variant="body1" color="#55de0c">
                  Đăng ký thành công! Vui lòng xác thực qua email trước khi đăng
                  nhập.
                </Typography>
              )
            ) : isSuccess === false ? (
              // Hiển thị thông báo lỗi đăng ký
              <Typography variant="body1" color="error">
                {errorMessage || "Đăng ký thất bại. Vui lòng thử lại!"}
              </Typography>
            ) : null}

            {/* Hiển thị thông báo sau khi gửi lại email */}
            {resendMessage && (
              <Typography
                variant="body2"
                color={resendMessage.includes("thất bại") ? "error" : "primary"}
                sx={{ mt: 1 }}
              >
                {resendMessage}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Login Container */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            height: "100%",
            left: 0,
            width: "50%",
            zIndex: 2,
            transform: isSignUpActive ? "translateX(-100%)" : "translateX(0)",
            transition: transition,
          }}
        >
          <Box /* ... Sign In form elements ... */>
            <Typography
              sx={{
                fontWeight: "bold",
                pt: 2,
                textTransform: "uppercase",
                color: theme.palette.primary.main,
              }}
              variant="h1"
              gutterBottom
            >
              Login
            </Typography>
            <Box sx={{ margin: "20px 0" }}>
              {/* Social Icons */}
              <IconButton
                size="small"
                sx={{ border: "1px solid #DDDDDD", m: "0 5px" }}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ border: "1px solid #DDDDDD", m: "0 5px" }}
              >
                <FontAwesomeIcon icon={faGooglePlusG} />
              </IconButton>
              <IconButton
                size="small"
                sx={{ border: "1px solid #DDDDDD", m: "0 5px" }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </IconButton>
            </Box>

            <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
              or use your account
            </Typography>

            <TextField
              onChange={handleChange}
              name="identifier"
              label="Email/SDT"
              type="text"
              sx={{ width: "90%" }}
            />
            <TextField
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              sx={{ width: "90%" }}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <Link 
                onClick={() => navigate("/forgot-password")}
                variant="body2" 
                sx={{ 
                  my: 2, 
                  mx: 2,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                  }
                }}
              >
                Forgot password?
              </Link>
              <Button
                disabled={!isEnableLoginBtn}
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleLoginSubmit}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </Box>
          {errorMessage && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" color="error">
                {errorMessage}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Overlay Container */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "50%",
            height: "100%",
            overflow: "hidden",
            zIndex: 100,
            transform: isSignUpActive ? "translateX(-100%)" : "translateX(0)",
            transition: transition,
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: "#FFFFFF",
              position: "relative",
              left: "-100%",
              height: "100%",
              width: "200%",
              transform: isSignUpActive ? "translateX(50%)" : "translateX(0)",
              transition: transition,
            }}
          >
            {/* Overlay Panel Left */}
            <Box
              sx={{
                transform: isSignUpActive
                  ? "translateX(0)"
                  : "translateX(-20%)",
                transition: transition,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 40px",
                textAlign: "center",
                top: 0,
                height: "100%",
                width: "50%",
              }}
            >
              <Typography variant="h1" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 100,
                  lineHeight: "20px",
                  letterSpacing: "0.5px",
                  margin: "20px 0 30px",
                }}
              >
                Login with your personal info
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                  },
                }}
                onClick={handleSignInClick}
              >
                Login
              </Button>
            </Box>

            {/* Overlay Panel Right */}
            <Box
              sx={{
                transform: isSignUpActive ? "translateX(20%)" : "translateX(0)",
                transition: transition,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 40px",
                textAlign: "center",
                top: 0,
                right: 0,
                height: "100%",
                width: "50%",
              }}
            >
              <Typography variant="h1" gutterBottom>
                Hello, Friend!
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 100,
                  lineHeight: "20px",
                  letterSpacing: "0.5px",
                  margin: "20px 0 30px",
                }}
              >
                Enter details and start journey
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                  },
                }}
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default Login;
