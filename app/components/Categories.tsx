
function Categories() {
  return (
    <section className="categories-section">
      <h3 className="categories-title">Категорії</h3>
      <div className="categories-container">
        {/* Category Item - Mirrors */}
        <div className="category-item">
          <img src="/images/mirror.png" alt="Дзеркала" />
          <div className="category-overlay">
            <h4>Дзеркала</h4>
          </div>
        </div>

        {/* Category Item - Cabinets */}
        <div className="category-item">
          <img src="/images/wardrobe.png" alt="Шафи" />
          <div className="category-overlay">
            <h4>Шафи</h4>
          </div>
        </div>

        {/* Category Item - Tables */}
        <div className="category-item">
          <img src="/images/cabinet.png" alt="Тумби" />
          <div className="category-overlay">
            <h4>Тумби</h4>
          </div>
        </div>

        {/* Add more categories as needed */}
      </div>
    </section>
  );
}

export default Categories;
