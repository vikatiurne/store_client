import { IoLocation } from "react-icons/io5";
import { MdPhoneIphone } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Footer.module.css";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";

const Footer = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const role = useSelector((state) => state.auth.user.role);

  return (
    <section className={styles.footerContainer}>
      <div className={styles.footerInfo}>
        <div className={styles.shopInfo}>
          <h3>Yummy Store</h3>
          <p>
            Спеціалізується на наданні якісних, натуральних, стильних смаколиків
            для вашого свята
          </p>
        </div>
        <div className={styles.shopContacts}>
          <div className={styles.contacts}>
            <p className={styles.title}>Контакти</p>
            <ul>
              <li>
                <IoLocation className={styles.icon} />
                м.Харків, Індустріальний район
              </li>
              <li>
                <MdPhoneIphone className={styles.icon} />
                <div className={styles.phones}>
                  <a href="tel:380997774480">(099)-777-44-80</a>
                  <a href="tel:380676070348">(067)-60-70-348</a>
                </div>
              </li>
              <li>
                <AiTwotoneMail className={styles.icon} />{" "}
                viktoriiakon22@gmail.com
              </li>
            </ul>
          </div>
          <div className={styles.quickLinks}>
            <p className={styles.title}>Перейти до</p>
            <ul>
              <li>
                <Link to="/"> Головна</Link>
              </li>
              {isAuth ? (
                <li>
                  {role !== "ADMIN" ? (
                    <Link to="office/orders"> Кабінет</Link>
                  ) : (
                    <Link to="admin"> Адмін Панель</Link>
                  )}
                </li>
              ) : (
                <li>
                  <Link to="auth">Логін/реєєстрація</Link>
                </li>
              )}
              <li>
                <Link to="basket">Кошик</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={styles.title}>Слідкуйте за нами</p>
            <div className={styles.follow}>
              <a
                href="https://www.facebook.com/media/set/?set=a.1289490167834306&type=3&locale=uk_UA"
                target="_blanc"
              >
                <img src={facebook} alt="facebook" />
              </a>
              <a
                href="https://www.instagram.com/viktoriiakon22/"
                target="_blanc"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
