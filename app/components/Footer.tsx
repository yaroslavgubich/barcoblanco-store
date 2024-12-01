import Link from "next/link";
import { urlFor } from "../lib/client";

const Footer: FunctionComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-section left">
          <div className="barcoblanco">
            <h2>Barcoblanco</h2>
            <div className="contact-info">
              <p>barcoblanco@gmail.com</p>
              <p>вул. Академіка Кримського, 27а</p>
              <p>Слов’янськ, Україна</p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-section middle">
          <div className="contacts">
            <h3>Контакти:</h3>
            <div className="phone-groups">
              <div className="phone-group">
                <p>
                  <strong>Київ</strong>
                </p>
                <p>+38 (044) 364-22-63</p>
                <p>
                  <strong>Lifecell</strong>
                </p>
                <p>+38 (095) 064-22-55</p>
              </div>
              <div className="phone-group">
                <p>
                  <strong>KYIVSTAR</strong>
                </p>
                <p>+38 (098) 999-42-25</p>
                <p>
                  <strong>Vodafone</strong>
                </p>
                <p>+38 (050) 252-44-69</p>
              </div>
            </div>
          </div>
          <div className="information">
            <h3>Інформація</h3>
            <ul>
              <li>
                <a href="/about">Про нас</a>
              </li>
              <li>
                <a href="/guarantee">Гарантія</a>
              </li>
              <li>
                <a href="/delivery">Доставка та оплата</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-section right">
          <div className="working-hours">
            <h3>Ми працюємо:</h3>
            <p>Пн-Пт: з 9.00 до 19.00</p>
            <p>Субота: з 10.00 до 18.00</p>
            <p>Неділя: з 10.50 до 16.30</p>
          </div>
          <div className="footer-social">
            <a
              href="https://www.telegram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                alt="Telegram"
                src="/icons/telegram_icon.svg"
              />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                alt="Facebook"
                src="/icons/facebook_icon.svg"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                alt="Instagram"
                src="/icons/instagram_icon.svg"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
