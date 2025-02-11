// components/ui/AboutSection.tsx
import Image from "next/image";

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        {/* About Text */}
        <div className="about-text">
          <h3>ПРО НАС</h3>
          <p>
            <strong>Barco Blanco</strong> — місце, де поєднуються
            функціональність та естетика, а якість йде поруч із доступністю. Ми
            з гордістю вже 10 років допомагаємо нашим клієнтам створювати
            затишок у їхніх домівках, пропонуючи меблі, що відповідають сучасним
            трендам дизайну та майстерності.
          </p>
          <p>
            Наш асортимент включає все необхідне для створення ідеального
            інтер’єру: від стильних меблів для вітальні до ергономічних рішень
            для офісу. Кожен виріб у нашому магазині ретельно відібраний, щоб
            відповідати найвищим стандартам якості та довговічності.
          </p>
          <p>
            Наша місія — допомогти вам створити дім, який відображає вашу
            індивідуальність, де кожна деталь продумана і сприяє комфортному
            життю. Ми прагнемо зробити процес вибору та покупки меблів
            максимально простим та приємним, надаючи високий рівень сервісу та
            піклуючись про кожного клієнта.
          </p>
          <p>
            Перегляньте наш каталог і переконайтеся самі: з нами ваш дім стане
            саме тим затишним куточком, про який ви мріяли!
          </p>
          <a href="/products" className="catalog-button">
            ДО КАТАЛОГУ
          </a>
        </div>

        {/* About Image */}
        <div className="about-image">
          <Image
            src="/images/about_image.png"
            alt="Про нас"
            width={500} // Replace with the actual width of the image
            height={500} // Replace with the actual height of the image
            priority // Ensures the image is preloaded for better performance
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
