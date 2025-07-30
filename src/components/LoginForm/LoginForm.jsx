import css from "./LoginForm.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useState } from "react";
import eyeOpen from "../../assets/images/icons/eye.svg";
import eyeClosed from "../../assets/images/icons/eye-clossed.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values) => {
    setLoginError(null);
    dispatch(
      loginThunk({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        console.log(`Login successful`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setLoginError(`Error :) ${error}`);
      });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <h3 className={css.title}>Login</h3>
        {loginError && (
          <div
            style={{
              color: "red",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            {loginError}
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={css.inputGroup}>
              <label htmlFor={emailFieldId} className={css.label}>
                Enter your email address
              </label>
              <Field
                name="email"
                type="email"
                id={emailFieldId}
                className={css.input}
              />
            </div>
            <div className={css.inputGroup}>
              <label htmlFor={passwordFieldId} className={css.label}>
                Enter a password
              </label>
              <div className={css.passwordEye}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id={passwordFieldId}
                  className={css.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={css.eyeButton}
                >
                  {showPassword ? (
                    <img src={eyeOpen} alt="Show password" />
                  ) : (
                    <img src={eyeClosed} alt="Hide password" />
                  )}
                </button>
              </div>
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
