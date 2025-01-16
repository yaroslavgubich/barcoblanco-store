
function Categories() {
  return (
    <section className="categories-section">
      {/* <h1 className="categories-title">Категорії</h1> */}
      <div className="categories-container">
        {/* Category Item - Mirrors */}
        <div className="category-item">
          <img src="/images/Дзеркала.png" alt="Дзеркала" />
          <div className="category-overlay">
            <p>Дзеркала</p>
          </div>
        </div>

        {/* Category Item - Cabinets */}
        <div className="category-item">
          <img src="/images/Шафи.png" alt="Шафи" />
          <div className="category-overlay">
            <p>Шафи</p>
          </div>
        </div>

        {/* Category Item - Tables */}
        <div className="category-item">
          <img src="/images/Тумби.png" alt="Тумби" />
          <div className="category-overlay">
            <p>Тумби</p>
          </div>
        </div>

        {/* Category Item - WATER */}
        <div className="category-item">
          <img src="/images/WATER.png" alt="Тумби" />
          <div className="category-overlay">
            <p>Water</p>
          </div>
        </div>


        {/* Add more categories as needed */}
      </div>
    </section>
  );
}

export default Categories;
