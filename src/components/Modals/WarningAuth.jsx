import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './Modals.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WarningAuth = ({ active, setActive }) => {

  const role = useSelector((state) => state.auth.user.role);

  const render = (
    <Modal active={active} setActive={setActive}>
      <div className={styles.authModal}>
        {role === 'ADMIN'
          ? (<>
            <p>Адміністратор не може голосувати</p>
            <div className={styles.control}>
              <Button onclick={setActive}>Зрозуміло</Button>
            </div>
          </>
          )
          : (<>
                  <p>Голосувати можуть тількі зареєстровані користувачі</p>
                  <div className={styles.control}>
                  <Button onclick={setActive}>Зрозуміло</Button>
                  <Link to="/auth"><Button onclick={setActive}>Увійти</Button></Link>
                  </div>
              </>
          )
        }
      </div>
    </Modal>
  );

  return render;
};

export default WarningAuth;
