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
import { useState } from "react";
import { LoginRequest, SignupRequest } from "../model/auth_model";
import { useAuth } from "../hook/useAuth";
import { signupService } from "../services/auth_service";

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
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const { login, loading, error } = useAuth();

  const [loginValue, setLoginValue] = useState<LoginRequest>({
    identifier: "",
    password: "",
  });
  const [signupValue, setSignupValue] = useState<SignupRequest>({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isEnableLoginBtn, setIsEnableLoginBtn] = useState<boolean>(false);
  const [isEnableSignupBtn, setEnableSignupBtn] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      // --- Nếu đang ở form Đăng nhập ---
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
    await login(loginValue);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    try {
      await signupService(signupValue);
      setIsSuccess(true);
    } catch (err: any) {
     const backendMessage = err.response?.data?.message;
      
      setErrorMessage(backendMessage || err.message || "Đã xảy ra lỗi không xác định.");
      
      console.log("Signup failed:", err.response?.data || err);
      setIsSuccess(false);
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

          <Box sx={{mt: 2, mb: 1}}>
            {isSuccess === true ? (
              <Typography variant="h6" color="#55de0c">
                Đăng ký thành công! Vui lòng xác thực qua email trước khi đăng
                nhập.
              </Typography>
            ) : isSuccess === false ? (
              <Typography variant="h6" color="error">
                {errorMessage}
              </Typography>
            ) : null}
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
              <Link href="#" variant="body2" sx={{ my: 2, mx: 2 }}>
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
          {error && (
            <Box sx={{mt: 2}}>
              <Typography variant="h6" color="error">
                {error}
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
