import Link from "next/link";
import Image from "next/image";

function Categories() {
  return (
    <section className="categories-section">
      <div className="categories-container">
        <Link href="/category/mirrors">
          <div className="category-item">
            <Image
              src="/images/mirror.png"
              alt="Дзеркала"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="category-overlay">
              <h4>Дзеркала</h4>
            </div>
          </div>
        </Link>

        <Link href="/category/wardrobe">
          <div className="category-item">
            <Image
              src="/images/wardrobe.png"
              alt="Шафи"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="category-overlay">
              <h4>Шафи</h4>
            </div>
          </div>
        </Link>

        <Link href="/category/cabinet">
          <div className="category-item">
            <Image
              src="/images/cabinet.png"
              alt="Тумби"
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="category-overlay">
              <h4>Тумби</h4>
            </div>
          </div>
        </Link>

        <Link href="/category/waterproof">
          <div className="category-item">
            <Image
              src="/images/waterproof.jpg"
              alt="Водонепроникні"
              fill
              style={{ objectFit: "cover" }}
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


