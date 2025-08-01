import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerThunk, refreshThunk } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import s from "./UploadForm.module.css";
import MediaLogo from "../../assets/images/icons/media.svg?react";

const UploadForm = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");
  const [registerData, setRegisterData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("registerData");
    if (stored) {
      setRegisterData(JSON.parse(stored));
    } else {
      navigate("/register");
    }
  }, [navigate]);

  const initialValues = { photo: null };

  const validationSchema = Yup.object({
    photo: Yup.mixed().test(
      "fileSize",
      "File size is too large (max 1MB)",
      (value) => {
        if (!value) return true;
        return value.size <= 1024 * 1024;
      }
    ),
  });

  const submitRegister = async (formData) => {
    try {
      await dispatch(registerThunk(formData)).unwrap();
      await dispatch(refreshThunk()); // <- ключова частина
      navigate("/");
    } catch (error) {
      setFormError(error?.message || "Registration failed.");
    }
  };

  const handleSubmit = async (values) => {
    if (!registerData) {
      setFormError("Missing registration data.");
      return;
    }

    const { name, email, password } = registerData;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (values.photo) {
      formData.append("avatar", values.photo);
    }

    await submitRegister(formData);
  };

  const handleSkip = async () => {
    if (!registerData) {
      setFormError("Missing registration data.");
      return;
    }

    const { name, email, password } = registerData;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    await submitRegister(formData);
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={s.form}>
            <h2 className={s.title}>Upload your photo</h2>

            <div
              className={s.uploadBox}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                name="photo"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                  setFormError("");
                }}
              />
              <MediaLogo className={s.icon} />
            </div>

            <ErrorMessage name="photo" component="p" className={s.error} />
            {formError && <p className={s.error}>{formError}</p>}

            <button
              type="submit"
              className={s.saveButton}
              disabled={isSubmitting}
            >
              Save
            </button>
            <button
              type="button"
              className={s.saveButton}
              disabled={isSubmitting}
              onClick={handleSkip}
            >
              Skip
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadForm;

