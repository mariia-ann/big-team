import { Formik, Form, Field } from "formik";
import css from "./AddArticleForm.module.css";
import { useState } from "react";

export const CreateArticleForm = () => {
  const [previewUrl, setPreviewUrl] = useState(null);

  return (
    <Formik
      initialValues={{ title: "", text: "", image: null }}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitting:", values);
        resetForm();
        setPreviewUrl(null);
      }}
    >
      {({ setFieldValue, values }) => {
        const handleImageChange = (event) => {
          const file = event.currentTarget.files[0];
          setFieldValue("image", file);
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
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
                      <span className={css.cameraIcon}>📷</span>
                    )}
                  </div>
                </label>
              </div>

              <div className={css.inputsWrapper}>
                <label className={css.label}>
                  Title
                  <Field
                    name="title"
                    placeholder="Enter the title"
                    className={css.input}
                  />
                </label>
              </div>
              <Field
                as="textarea"
                name="text"
                placeholder="Enter a text"
                className={css.textarea}
              />
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
