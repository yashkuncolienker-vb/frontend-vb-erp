import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const sx = {
  fields: {
    width: "600px",
  },
  button: {
    minWidth: "20px",
    padding: "5px",
  },
  container: {
    width: "200px",
  },
};
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
  let history = useHistory();
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
        await axios.post("http://localhost:4000/users/login", values, config);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Successfully LoggedIn User",
          })
        );
        history.push("/");
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={sx.fields}
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
              sx={sx.fields}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={sx.button}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
