import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import eyeOpen from "../../assets/images/icons/eye.svg";
import eyeClosed from "../../assets/images/icons/eye-clossed.svg";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { email: "", password: "" };
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = async (values) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <h3 className={css.title}>Login</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={css.inputGroup}>
              <label htmlFor={emailId} className={css.label}>
                Email
              </label>
              <Field
                name="email"
                type="email"
                id={emailId}
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.inputGroup}>
              <label htmlFor={passwordId} className={css.label}>
                Password
              </label>
              <div className={css.passwordEye}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id={passwordId}
                  className={css.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={css.eyeButton}
                >
                  <img
                    src={showPassword ? eyeOpen : eyeClosed}
                    alt={showPassword ? "Show password" : "Hide password"}
                  />
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.btn}>
              Login
            </button>
          </Form>
        </Formik>

        <p className={css.text}>
          Don't have an account?{" "}
          <NavLink to="/register" className={css.navlink}>
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
