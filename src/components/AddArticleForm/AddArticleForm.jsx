import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addArticle } from "../../redux/articles/operations";
import { selectUser } from "../../redux/auth/selectors";
import IconUploadFoto from "../../assets/images/icons/media.svg?react";
import css from "./AddArticleForm.module.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters")
    .required("Title is required"),
  text: Yup.string()
    .min(10, "Text must be at least 10 characters")
    .required("Text is required"),
  image: Yup.mixed().required("Image is required"),
});

export const CreateArticleForm = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const textRef = useRef();

  const initialValues = {
    title: "",
    text: "",
    image: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("article", values.text);
    formData.append("img", values.image);
    formData.append("name", user.name);
    formData.append("desc", values.text.slice(0, 200) + "...");
    formData.append("date", new Date().toISOString().split("T")[0]);
    formData.append("rate", 0);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    } //це тимчасово для перевірки

    try {
      const response = await dispatch(addArticle(formData)).unwrap();
      resetForm();
      setPreviewUrl(null);
      // navigate(`/articles/${response.data._id}`);
    } catch (error) {
      console.error("Failed to add article:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => {
        const handleImageChange = (event) => {
          const file = event.currentTarget.files[0];
          setFieldValue("image", file);
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
        };

        const handleInput = (event) => {
          const textarea = event.target;
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
          setFieldValue("text", textarea.value);
        };

        return (
          <Form className={css.form}>
            <h2 className={css.heading}>Create an article</h2>

            <div className={css.wrapper}>
              <div className={css.imageWrapper}>
                <label className={css.imageLabel}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={css.imageInput}
                  />
                  <div className={css.imagePreview}>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={css.previewImage}
                      />
                    ) : (
                      <IconUploadFoto className={css.cameraIcon} />
                    )}
                  </div>
                </label>
                <ErrorMessage
                  name="image"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputsWrapper}>
                <label className={css.label}>
                  Title
                  <Field
                    name="title"
                    placeholder="Enter the title"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className={css.error}
                  />
                </label>
              </div>

              <label className={css.label}>
                <textarea
                  name="text"
                  placeholder="Enter a text"
                  className={css.textarea}
                  ref={textRef}
                  value={values.text}
                  onInput={handleInput}
                />
                <ErrorMessage
                  name="text"
                  component="div"
                  className={css.error}
                />
              </label>
            </div>

            <button type="submit" className={css.submitButton}>
              Publish Article
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
