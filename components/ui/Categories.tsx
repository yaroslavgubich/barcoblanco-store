import Link from "next/link";
import Image from "next/image";

function Categories() {
  const categories = [
    { title: "Дзеркала",      href: "/category/mirrors",    image: "/images/mirror.png"     },
    { title: "Шафи",          href: "/category/wardrobe",   image: "/images/wardrobe.png"   },
    { title: "Тумби",         href: "/category/cabinet",    image: "/images/cabinet.png"    },
    { title: "Комоди",        href: "/category/dresser",    image: "/images/dresser.png"    }, // ← новая категория
    { title: "Тумби Water",   href: "/category/waterproof", image: "/images/waterproof.jpg" },
  ];

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* 2‑2‑3‑5 сетка */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map(({ title, href, image }) => (
            <Link
              key={href}
              href={href}
              className="group relative w-full aspect-square sm:aspect-auto h-auto
                         sm:h-[220px] md:h-[260px] lg:h-[300px]
                         rounded-2xl overflow-hidden shadow-md
                         transition-transform hover:scale-[1.03] hover:shadow-lg
                         bg-gray-100"
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width:768px) 100vw,
                       (max-width:1024px) 50vw,
                       20vw"
                className="object-cover"
                priority
              />

              {/* подпись */}
              <div className="absolute bottom-0 inset-x-0 bg-[#1996A3]/90 py-3 text-center">
                <h4 className="text-white font-semibold text-base md:text-lg lg:text-xl m-0">
                  {title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;


