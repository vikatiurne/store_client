import { Outlet } from 'react-router-dom';

import styles from './MainLoyaut.module.css';
import { Header } from '../../components';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
};

export default MainLayout;
