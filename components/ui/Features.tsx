// components/ui/Features.tsx
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
    <section className="bg-[#d8f0f3] py-8 w-screen -ml-[50vw] left-1/2 relative mb-20 box-border">
      <div className="flex flex-wrap justify-center gap-4 max-w-[1400px] mx-auto">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] p-4 flex flex-col items-center justify-start min-h-[240px] text-center"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={50}
              height={50}
              className="mb-4"
            />
            <h3 className="text-[1.2rem] font-bold mb-2 text-black min-h-[48px] flex items-center justify-center text-center">
              {feature.title}
            </h3>
            <p className="text-[0.9rem] text-[#555] leading-[1.5] min-h-[60px] flex items-center justify-center text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
