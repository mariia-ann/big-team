import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreatorsSection.module.css';
import arrowIcon from '../../assets/images/icons/arrow.svg';
import Container from '../Container/Container';
import { selectCreators } from '../../redux/author/selectors.js';
import { fetchAuthors } from '../../redux/author/operations.js';
import { useDispatch, useSelector } from 'react-redux';

const CreatorsSection = () => {
  // const [creators, setCreators] = useState([]);
  const creators = useSelector(selectCreators);
   const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchCreators = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3000/api/creators/top-creators');
  //       const data = await res.json();
  //       setCreators(data);
  //     } catch (error) {
  //       console.error('Failed to fetch creators:', error);
  //     }
  //   };

  //   fetchCreators();
  // }, []);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.cont}>
          <div className={styles.header}>
            <h2 className={styles.title}>Top Creators</h2>
            <Link to='/authors' className={styles.link}>
              Go to all Creators
              {<img src={arrowIcon} alt='arrow' className={styles.icon} />}
            </Link>
          </div>
          <div className={styles.people}>
            <ul className={styles.list}>
              {creators.slice(0, 6).map(({ _id, name, avatarUrl }) => (
                <li key={_id} className={styles.card}>
                  <img src={avatarUrl || null} alt={name} className={styles.avatar} />
                  <p className={styles.name}>{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreatorsSection;
