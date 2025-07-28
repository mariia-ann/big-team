import { useEffect, useState } from "react";
import s from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  const [loaderSize, setLoaderSize] = useState(70);

  useEffect(() => {
    const width = window.innerWidth;

    if (width < 480) {
      setLoaderSize(30); // мобильный
    } else if (width < 768) {
      setLoaderSize(50); // планшет
    } else {
      setLoaderSize(70); // десктоп
    }
  }, []);
  return (
    <div className={s.containerLoader}>
      <ClipLoader
        color="#649179"
        loading
        size={loaderSize}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;
