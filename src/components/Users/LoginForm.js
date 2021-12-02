import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { userActions } from "../../store/user-slice";

const validationSchema = yup.object({
  email: yup
    .string("Email")
    .email("Enter a valid email [xyz@xyz.xyz]")
    .required("Email is required"),
  password: yup
    .string("Password")
    .min(8, "Password length [8-50] characters")
    .max(50, "Password length [8-50] characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const config = {
        withCredentials: true,
        credentials: "same-origin",
      };
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}users/login`,
          values,
          config
        );
        dispatch(userActions.handleLoginBool({ loginBool: true }));
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Successfully Logged In",
          })
        );
        navigate("/");
      } catch (e) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "Something went wrong TwT",
          })
        );
      }
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={2}>
        <Box
          sx={{
            marginTop: 10,
            padding: "10px 30px 10px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
