import s from "./AboutSection.module.css";

import mobile1x_1 from "../../assets/images/about/AboutUs-mobil1-1x.webp";
import mobile2x_1 from "../../assets/images/about/AboutUs-mobil1-2x.webp";
import tablet1x_1 from "../../assets/images/about/AboutUs-tab1-1x.webp";
import tablet2x_1 from "../../assets/images/about/AboutUs-tab1-2x.webp";
import desktop1x_1 from "../../assets/images/about/AboutUs-comp1-1x.webp";
import desktop2x_1 from "../../assets/images/about/AboutUs-comp1-2x.webp";

import mobile1x_2 from "../../assets/images/about/AboutUs-mobil2-1x.webp";
import mobile2x_2 from "../../assets/images/about/AboutUs-mobil2-2x.webp";
import tablet1x_2 from "../../assets/images/about/AboutUs-tab2-1x.webp";
import tablet2x_2 from "../../assets/images/about/AboutUs-tab2-2x.webp";
import desktop1x_2 from "../../assets/images/about/AboutUs-comp2-1x.webp";
import desktop2x_2 from "../../assets/images/about/AboutUs-comp2-2x.webp";

import desktop1x_3 from "../../assets/images/about/AboutUs-comp3-1x.webp";
import desktop2x_3 from "../../assets/images/about/AboutUs-comp3-2x.webp";

const AboutSection = () => {
  return (
    <section className={s.aboutSection}>
      <div className={s.aboutCardWrapper1}>
        <div className={s.aboutCard}>
          <h2 className={s.aboutTitle}>About us</h2>
          <p className={s.aboutText}>
            Harmoniq is a mindful publishing platform dedicated to mental health
            and well-being. We bring together writers, thinkers, and readers who
            believe that open, thoughtful stories can heal, inspire, and
            connect. Whether you're here to share your journey or learn from
            others — this is your space to slow down, reflect, and grow.
          </p>
        </div>
        {/* <div className={s.aboutGallery}> */}
        <picture>
          <source
            srcSet={`${mobile1x_1} 1x, ${mobile2x_1} 2x`}
            media="(max-width: 759px)"
          />
          <source
            srcSet={`${tablet1x_1} 1x, ${tablet2x_1} 2x`}
            media="(min-width: 760px) and (max-width: 1439px)"
          />
          <source
            srcSet={`${desktop1x_1} 1x, ${desktop2x_1} 2x`}
            media="(min-width: 1440px)"
          />
          <img
            src={mobile1x_1}
            alt="About image 1"
            className={s.aboutImage1}
            loading="lazy"
          />
        </picture>
      </div>
      <div className={s.aboutCardWrapper2}>
        <picture>
          <source
            srcSet={`${mobile1x_2} 1x, ${mobile2x_2} 2x`}
            media="(max-width: 759px)"
          />
          <source
            srcSet={`${tablet1x_2} 1x, ${tablet2x_2} 2x`}
            media="(min-width: 760px) and (max-width: 1439px)"
          />
          <source
            srcSet={`${desktop1x_2} 1x, ${desktop2x_2} 2x`}
            media="(min-width: 1440px)"
          />
          <img
            src={mobile1x_2}
            alt="About image 2"
            className={s.aboutImage2}
            loading="lazy"
          />
        </picture>
        <picture>
          <source
            srcSet={`${desktop1x_3} 1x, ${desktop2x_3} 2x`}
            media="(min-width: 1440px)"
          />
          <img
            src={desktop1x_3}
            alt="About image 3"
            className={s.aboutImage3}
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
};

export default AboutSection;
