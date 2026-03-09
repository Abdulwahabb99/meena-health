import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import bgImage from "assets/images/illustrations/Background.png";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "icons/EmailIcon";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";
import { useFormik } from "formik";
import { signInValidationSchema } from "./signInValidation";
import { CircularProgress } from "@mui/material";
import { useAuth } from "shared/hooks/useAuth";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDTypography from "components/MDTypography";
import widgetImage from "assets/images/illustrations/Widget.png";
import logo from "assets/images/mainLogo.png";
import { useLoginMutation } from "services/mutations/useLoginMutation";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword((v) => !v);
  const { login } = useAuth();
  const loginMutation = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      loginMutation.mutate(values, {
        onSuccess: () => {
          login();
        },
        onError: (error) => {
          console.error("Login error (test):", error);
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <PageLayout background="white">
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { white } }) => white.main,
        }}
      >
        <Box display={{ xs: "none", lg: "flex" }}>
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{
              height: "86.382px",
              width: "123px",
              position: "absolute",
              top: "30px",
              left: "30px",
            }}
          />
        </Box>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
          >
            <MDBox py={3} px={3} textAlign="center">
              <MDBox mb={1} textAlign="center">
                <Typography variant="h4" fontWeight="bold">
                  تسجيل الدخول إلى حسابك
                </Typography>
              </MDBox>
              <MDTypography variant="body2" color="text"></MDTypography>
            </MDBox>
            <MDBox p={3}>
              {" "}
              <MDBox
                component="form"
                role="form"
                onSubmit={formik.handleSubmit}
              >
                <MDBox mb={2}>
                  <Typography
                    fontSize="14px"
                    fontWeight="400"
                    mb="4px"
                    color="#1E1F24"
                  >
                    البريد الإلكتروني
                  </Typography>

                  <TextField
                    name="email"
                    placeholder="ادخل بريدك الالكتروني"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&.Mui-focused fieldset": {
                          borderColor: "#379C7C",
                          borderWidth: "1.5px",
                        },
                      },
                    }}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <Typography
                    fontSize="14px"
                    fontWeight="400"
                    mb="4px"
                    color="#1E1F24"
                  >
                    كلمة المرور{" "}
                  </Typography>
                  <TextField
                    name="password"
                    placeholder="ادخل كلمة المرور"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handleTogglePasswordVisibility}
                          sx={{ cursor: "pointer" }}
                        >
                          {showPassword ? <EyeIcon /> : <EyeOutlineIcon />}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&.Mui-focused fieldset": {
                          borderColor: "#379C7C",
                          borderWidth: "1.5px",
                        },
                      },
                    }}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    size="large"
                    type="submit"
                    fullWidth
                    sx={{
                      color: "#FFF",
                      fontSize: "16px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(90deg, #3C9D76 100%, #0097C1 100%)",
                      boxShadow: "none",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #3C9D76 100%, #0097C1 100%)",
                        opacity: 0.9,
                      },
                    }}
                  >
                    {loginMutation.isPending ? (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "#FFF",
                        }}
                      />
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={6} pr={1} pt={0.8}>
          <MDBox
            display={{ xs: "none", lg: "flex" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{
              height: "calc(98vh)",
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              overflow: "hidden",
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            <Box sx={{ mt: 8, color: "#FFF !important" }}>
              <Typography fontSize={"32px"} fontWeight="600" mb={1}>
                مرحبًا بك في تجهيز بلس!{" "}
              </Typography>
              <Typography fontSize={"22px"} mb={4}>
                سجّل الدخول لإدارة نشاطك التجاري والوصول إلى كل المزايا.{" "}
              </Typography>
              <Box
                component="img"
                src={widgetImage}
                alt="Widget"
                sx={{
                  maxWidth: "90%",
                  height: "auto",
                }}
              />
            </Box>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default SignIn;
