import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";

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
  role: yup
    .string("Role")
    .oneOf(
      [
        "user",
        "approver",
        "leadership",
        "hr_admin",
        "finance_admin",
        "pms_admin",
        "super_admin",
      ],
      "Please select a Role"
    )
    .required("Please select a Role"),
});

const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddUserForm = () => {
  const navigate = useNavigate();
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
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}users/adduser`,
          values,
          config
        );
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Successfully Registered User",
          })
        );
        navigate("/users/login");
      } catch (e) {
        console.log(e);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error Registering User",
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
            display: "flex",
            marginTop: 5,
            padding: "10px 30px 10px 30px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.role && Boolean(formik.errors.role)}
                >
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    labelId="role"
                    fullWidth
                    id="role"
                    name="role"
                    label="Role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"approver"}>Approver</MenuItem>
                    <MenuItem value={"leadership"}>Leadership</MenuItem>
                    <MenuItem value={"hr_admin"}>HR Admin</MenuItem>
                    <MenuItem value={"finance_admin"}>Finance Admin</MenuItem>
                    <MenuItem value={"pms_admin"}>PMS Admin</MenuItem>
                    <MenuItem value={"super_admin"}>Super Admin</MenuItem>
                  </Select>
                  {formik.touched.role && (
                    <FormHelperText>{formik.errors.role}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddUserForm;
