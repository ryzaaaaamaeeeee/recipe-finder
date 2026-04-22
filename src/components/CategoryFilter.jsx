
function CategoryFilter({categories, onFilter}) {
    return (
        <div className="categories">
            {categories.map((cat) => (
                <button
                key={cat.idCategory}
                onClick={() => onFilter(cat.strCategory)}>
                    {cat.strCategory}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;