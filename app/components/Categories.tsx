import Link from "next/link";

function Categories() {
  return (
    <section className="categories-section">
      <h3 className="categories-title">Категорії</h3>
      <div className="categories-container">
        {/* Category Item - Mirrors */}
        <Link href="/category/mirrors">
          <div className="category-item">
            <img src="/images/mirror.png" alt="Дзеркала" />
            <div className="category-overlay">
              <h4>Дзеркала</h4>
            </div>
          </div>
        </Link>

        {/* Category Item - Wardrobe */}
        <Link href="/category/wardrobe">
          <div className="category-item">
            <img src="/images/wardrobe.png" alt="Шафи" />
            <div className="category-overlay">
              <h4>Шафи</h4>
            </div>
          </div>
        </Link>

        {/* Category Item - Cabinet */}
        <Link href="/category/cabinet">
          <div className="category-item">
            <img src="/images/cabinet.png" alt="Тумби" />
            <div className="category-overlay">
              <h4>Тумби</h4>
            </div>
          </div>
        </Link>

        {/* Category Item - Waterproof */}
        <Link href="/category/waterproof">
          <div className="category-item">
            <img src="/images/waterproof.jpg" alt="Водонепроникні" />
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
