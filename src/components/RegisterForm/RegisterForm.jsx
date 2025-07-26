import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import s from "./RegisterForm.module.css";
import { useState } from "react";
import IconEye from "../../assets/images/icons/eye.svg?react";
import IconEyeClosed from "../../assets/images/icons/eye-clossed.svg?react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be at most 32 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .max(64, "Email must be at most 64 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please repeat your password"),
});

const RegisterForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword:"",
  }
const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const[isPasswordFocused, setIsPasswordFocused] = useState(false);

  const calculateStrength = (value) => {
    let strength = 0;
    if (value.length > 5) strength += 1;
    if (value.length > 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[^A-Za-z0-9]/.test(value)) strength += 1;
    return strength
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("https://твій-бекенд/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Registration error. Please try again.");
        setSubmitting(false);
        return
      }
      const data = await response.json();
      resetForm();
      navigate("/photo");
    } catch (error) {
       alert("Registration error. Please try again.");
       setSubmitting(false);
    }
  };
  
  
  return (
    
    <div className={s.registerContainer}>
      
        <h2 className={s.title} >Register</h2>
      <p className={s.description}>Join our community of mindfulness and wellbeing!</p>
      
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue, errors, touched }) => (
          <Form className={s.registerForm}>
            <div className={s.fieldWrapper}>
            <label className={s.labelForm} htmlFor="name">Enter your name</label>
              <Field className={`${s.fieldForm}  ${errors.name && touched.name ? s.errorInput : ''}`} id="name" name="name" type="text" placeholder="Max" />
              
            <ErrorMessage name="name" component="div" className={s.error} />
            </div>
            
            <div className={s.fieldWrapper}>
            <label className={s.labelForm} htmlFor="email">Enter your email address</label>
            <Field className={`${s.fieldForm} ${errors.email && touched.email ? s.errorInput : ''}`} id="email" name="email" type="email" placeholder="email@gmail.com" />
            <ErrorMessage name="email" component="div" className={s.error} />
</div>
              <div className={s.fieldWrapper}>
              <label className={s.labelForm} htmlFor="password">Create a strong password</label>
              <div>
                <div className={s.passwordWrapper}>
                  <Field
                    className={`${s.fieldForm} ${errors.password && touched.password ? s.errorInput : ''}`} id="password" name="password" type={showPassword ? "text" : "password"} placeholder="*********"
                    onChange={ (e)=>{
                      const value = e.target.value;
                      setFieldValue("password", value);
                      setPasswordStrength(calculateStrength(value))
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={()=>setIsPasswordFocused(false)}
                  />
                <button
                  type="button"
                  className={s.eyeBtn}
                  onClick={() => setShowPassword((prev) => !prev)}>
    {showPassword ? <IconEye/> :   <IconEyeClosed/>}
     
    
                  </button>
                  </div>
              </div>
              <ErrorMessage name="password" component="div" className={s.error} />
              {isPasswordFocused && (
  <div className={s.progressWrapper}>
    <p className={s.descProgres}>Password strength</p>
    <div className={s.progressBar}>
      <div
        className={s.progressFill}
        style={{ width: `${(passwordStrength / 5) * 100}%`,
          
         }}
      ></div>
    </div>
  </div>
)}
              </div>

            <div className={s.fieldWrapper}>
              <label className={s.labelForm} htmlFor="confirmPassword">Repeat your password</label>
              <div className={s.passwordWrapper}>
              <Field
                className={`${s.fieldForm} ${errors.confirmPassword && touched.confirmPassword ? s.errorInput : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="*********" />
                <button
    type="button"
    className={s.eyeBtn}
    onClick={() => setShowConfirmPassword((prev) => !prev)}
  >
    {showConfirmPassword ? <IconEye/> :  <IconEyeClosed/>}
     
                </button>
                </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={s.error}
              />
              </div>

              <button
                className={s.createBtn}
                type="submit"
                disabled={isSubmitting}>
              Create account
            </button>

            <p className={s.descAcc}>
              Already have an account?{" "} <Link to="/login" className={s.loginLink}>Log in</Link>
            </p>
          </Form>
)}
      </Formik>
      </div>
      
  )
}

export default RegisterForm