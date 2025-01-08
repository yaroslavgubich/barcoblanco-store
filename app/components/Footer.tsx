import Link from "next/link";
import React from "react";

const Footer = () => {
return (
<footer id="footer" className="footer">
<div className="footer-content">
{/* Левая секция */}
<div className="footer-section">
<h3>Контакти:</h3>
<p>+38 (044) 364-22-63</p>
<p>avsdom@ukr.net</p>
</div>

{/* Средняя секция */}
<div className="footer-section">
<h3>Інформація</h3>
<ul>
<li>
<Link href="/about">Про нас</Link>
</li>
<li>
<Link href="/guarantee">Гарантія</Link>
</li>
<li>
<Link href="/delivery">Доставка та оплата</Link>
</li>
</ul>
</div>

{/* Правая секция */}
<div className="footer-section">
<h3>Ми працюємо:</h3>
<p>Пн-Пт: з 9.00 до 19.00</p>
<p>Субота: з 10.00 до 18.00</p>
<p>Неділя: з 10.50 до 16.30</p>
</div>
</div>

{/* Социальные сети */}
<div className="footer-social">
<a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
<img
src="/icons/telegram_icon.svg"
alt="Telegram"
className="social-icon"
/>
</a>
<a href="https://viber.com" target="_blank" rel="noopener noreferrer">
<img
src="/icons/facebook_icon.svg"
alt="Viber"
className="social-icon"
/>
</a>
<a
href="https://instagram.com"
target="_blank"
rel="noopener noreferrer"
>
<img
src="/icons/instagram_icon.svg"
alt="Instagram"
className="social-icon"
/>
</a>
</div>
</footer>
);
};

export default Footer;


