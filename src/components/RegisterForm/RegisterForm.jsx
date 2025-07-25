import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import s from "./RegisterForm.module.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const handleSubmit = async (values,{setSubmitting,resetForm}) => {
    

    setSubmitting(false);
    resetForm();
  };
  
  
  return (
    // <Container>
    <div className={s.registerContainer}>
      
        <h2 className={s.title} >Register</h2>
      <p className={s.description}>Join our community of mindfulness and wellbeing!</p>
      
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={s.registerForm}>
            <div className={s.fieldWrapper}>
            <label className={s.labelForm} htmlFor="name">Enter your name</label>
              <Field className={s.fieldForm} id="name" name="name" type="type" placeholder="Max" />
              
            <ErrorMessage name="name" component="div" className={s.error} />
            </div>
            
            <div className={s.fieldWrapper}>
            <label className={s.labelForm} htmlFor="email">Enter your email address</label>
            <Field className={s.fieldForm} id="email" name="email" type="email" placeholder="email@gmail.com" />
            <ErrorMessage name="email" component="div" className={s.error} />
</div>
              <div className={s.fieldWrapper}>
              <label className={s.labelForm} htmlFor="password">Create a strong password</label>
              <div>
              <Field className={s.fieldForm} id="password" name="password" type={showPassword ? "text" : "password"} placeholder="*********" />
              <button type="button" className={s.eyeBtn}
              onClick={() => setShowPassword(prev => !prev)}>
               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className={s.error} />
              </div>

            <div className={s.fieldWrapper}>
            <label className={s.labelForm} htmlFor="confirmPassword">Repeat your password</label>
            <Field className={s.fieldForm} id="confirmPassword" name="confirmPassword" type="password" placeholder="*********" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={s.error}
              />
              </div>
             <div className="progress-bar-wrapper">
              <p>Password strength</p>
            </div>

           
            <button type="submit" disabled={isSubmitting}>
              Create account
            </button>

            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </Form>
)}
      </Formik>
      </div>
      // </Container>
  )
}

export default RegisterForm