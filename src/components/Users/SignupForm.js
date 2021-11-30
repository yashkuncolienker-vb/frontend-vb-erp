import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
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
};
const validationSchema = yup.object({
  first_name: yup
    .string("First Name")
    .min(3, "First Name [3-30] characters")
    .max(30, "First Name [3-30] characters")
    .required("First Name is Required"),
  last_name: yup
    .string("Last Name")
    .min(3, "Last Name [3-30] characters")
    .max(30, "Last Name [3-30] characters")
    .required("Last Name is Required"),
  email: yup
    .string("Email")
    .email("Enter a valid email [xyz@xyz.xyz]")
    .required("Email is required"),
  password: yup
    .string("Password")
    .min(8, "Password length [8-50] characters")
    .max(50, "Password length [8-50] characters")
    .required("Password is required"),
  role: yup.string("Role").min(3).max(30).required("Role is Required"),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await axios.post("http://localhost:4000/users/signup", values, config);
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Successfully Registered User",
          })
        );
      } catch (e) {
        console.log(e);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
          })
        );
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h4">Signup</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              sx={sx.fields}
              id="first_name"
              name="first_name"
              label="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={sx.fields}
              id="last_name"
              name="last_name"
              label="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
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
            <TextField
              sx={sx.fields}
              id="role"
              name="role"
              label="Role"
              type="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
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
              Signup
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignupForm;
