// components/ui/AboutSection.tsx
import Image from "next/image";
import Link from "next/link";
function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        {/* About Text */}
        <div className="about-text">
          <h3>ПРО НАС</h3>
            <div className="about-text-inner">
            <p>
              <strong>Barco Blanco</strong> — місце, де поєднуються
              функціональність та естетика, а якість йде поруч із доступністю.
              Ми з гордістю вже більше 10 років допомагаємо нашим клієнтам створювати
              затишок у їхніх домівках, пропонуючи меблі, що відповідають
              сучасним трендам дизайну та майстерності.
            </p>
            <p>
              Наш асортимент включає все необхідне для створення ідеального
              інтер’єру ванної кімнати: від стильних меблів до ергономічних рішень для вашого простору. 
              Кожен виріб у нашому каталозі ретельно відібраний, щоб
              відповідати найвищим стандартам якості та довговічності.
            </p>
            <p>
              Наша місія — допомогти вам створити ванну кімнату, яка відображає вашу
              індивідуальність, де кожна деталь продумана і сприяє вашому комфорту. Ми прагнемо зробити процес вибору та покупки меблів для ванної кімнати
              максимально простим та приємним, надаючи високий рівень сервісу та
              .
            </p>
            <p>
              Перегляньте наш каталог і переконайтеся самі: з нами ваша ванна кімната стане
              саме тим затишним куточком, про який ви мріяли!
            </p>
          </div>

          <Link href="/products" className="catalog-button">
            ДО КАТАЛОГУ
          </Link>
        </div>

        {/* About Image */}
        <div className="about-image">
          <Image
            src="/images/about_section.jpeg"
            alt="Про нас"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
