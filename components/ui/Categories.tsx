import Link from "next/link";
import Image from "next/image";

function Categories() {
  const categories = [
    {
      title: "Дзеркала",
      href: "/category/mirrors",
      image: "/images/mirror.png",
    },
    {
      title: "Тумби",
      href: "/category/cabinet",
      image: "/images/cabinet.png",
    },
    {
      title: "Пенали",
      href: "/category/dressers",
      image: "/images/dresser.webp",
    },
    {
      title: "Нависні Шафи",
      href: "/category/wardrobe",
      image: "/images/wardrobe.png",
    },
    {
      title: "Water",
      href: "/category/waterproof",
      image: "/images/waterproof.jpg",
    },
 
  ];

  return (
    <section className="bg-white py-10 px-4">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
          {categories.map(({ title, href, image }) => (
            <Link
              href={href}
              key={href}
              className="w-full sm:w-[42%] lg:w-[19%]"
            >
              <div className="relative aspect-square sm:aspect-auto h-auto sm:h-[220px] md:h-[260px] lg:h-[320px] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-[1.03] bg-gray-100">
                <Image
                  src={image}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#1996A3]/90 py-3 text-center z-10">
                  <h4 className="text-white text-lg md:text-xl font-semibold m-0">
                    {title}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
