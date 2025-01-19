import Link from "next/link";
import Image from "next/image";

function Categories() {
  return (
    <section className="categories-section">
      {/* <h1 className="categories-title">Категорії</h1> */}
      <div className="categories-container">
        {/* Category Item - Mirrors */}
        <Link href="/category/mirrors">
          <div className="category-item">
            <Image
              src="/images/mirror.png"
              alt="Дзеркала"
              width={200}
              height={200}
            />
            <div className="category-overlay">
              <h4>Дзеркала</h4>
            </div>
          </div>
        </Link>

        {/* Category Item - Wardrobe */}
        <Link href="/category/wardrobe">
          <div className="category-item">
            <Image
              src="/images/wardrobe.png"
              alt="Шафи"
              width={200}
              height={200}
            />
            <div className="category-overlay">
              <h4>Шафи</h4>
            </div>
          </div>
        </Link>

        {/* Category Item - Cabinet */}
        <Link href="/category/cabinet">
          <div className="category-item">
            <Image
              src="/images/cabinet.png"
              alt="Тумби"
              width={200}
              height={200}
            />
            <div className="category-overlay">
              <h4>Тумби</h4>
            </div>
          </div>
        </Link>

        {/* Category Item - Waterproof */}
        <Link href="/category/waterproof">
          <div className="category-item">
            <Image
              src="/images/waterproof.jpg"
              alt="Водонепроникні"
              width={200}
              height={200}
            />
            <div className="category-overlay">
              <h4>Водонепроникні</h4>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Categories;
