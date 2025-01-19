import React from "react";
import Image from "next/image";

const featuresData = [
  {
    icon: "/icons/first.png",
    title: "Захист покупця",
    description:
      "Ми гарантуємо допомогу в разі будь-яких проблемних ситуацій, які виникнуть з нашою продукцією.",
  },
  {
    icon: "/icons/second.png",
    title: "Привілеї клієнтів",
    description: "Передбачено багато бонусів, приємностей та інших переваг.",
  },
  {
    icon: "/icons/third.png",
    title: "Ціни виробника",
    description:
      "Дають можливість отримати товари за найбільш оптимальними цінами без додаткових націнок.",
  },
  {
    icon: "/icons/fourth.png",
    title: "Регулярні акції",
    description: "Ексклюзивні пропозиції для наших клієнтів.",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {featuresData.map((feature, index) => (
          <div key={index} className="feature-card">
            <Image
              src={feature.icon}
              alt={feature.title}
              width={50}
              height={50}
              className="feature-icon"
            />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
