import s from "./SectionTitle.module.css";

const SectionTitle = ({ title }) => {
  return <h2 className={s.sectionTitle}>{title}</h2>;
};

export default SectionTitle;
