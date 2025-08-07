import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerThunk } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import s from "./UploadForm.module.css";
import MediaLogo from "../../assets/images/icons/media.svg?react";
import { toast } from "react-hot-toast";

const UploadForm = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = async (values) => {
    if (!registerData) {
      const msg = "Missing registration data.";
      toast.error(msg);
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

    try {
      await dispatch(registerThunk(formData)).unwrap();
      toast.success("Registration successful ✅");
      navigate("/");
    } catch (error) {
      const errMsg = error?.message || "Registration failed.";
      toast.error(`Error: ${errMsg}`);
    }
  };

  const handleSkip = async () => {
    if (!registerData) {
      const msg = "Missing registration data.";
      toast.error(msg);
      return;
    }

    const { name, email, password } = registerData;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await dispatch(registerThunk(formData)).unwrap();
      toast.success("Registration without photo is successful ✅");
      navigate("/");
    } catch (error) {
      const errMsg = error?.message || "Registration failed.";
      toast.error(`Error: ${errMsg}`);
    }
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => {
          const handleFileChange = (event) => {
            const file = event.currentTarget.files[0];
            setFieldValue("photo", file);

            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setImagePreview(imageUrl);
            } else {
              setImagePreview(null);
            }
          };

          return (
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
                  onChange={handleFileChange}
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <MediaLogo className={s.icon} />
                )}
              </div>

              <button
                type="submit"
                className={`${s.saveButton} ${
                  !values.photo ? s.disabledButton : ""
                }`}
                disabled={isSubmitting || !values.photo}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default UploadForm;
