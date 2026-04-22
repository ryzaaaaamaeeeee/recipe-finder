
function RecipeCard ({ recipe, onSelect, onFavorite, favorites }) {
    return (
        <div className="recipe-card" onClick={() => onSelect(recipe.idMeal)}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
            <h2>{recipe.strMeal}</h2>
            <p>{recipe.strCategory}</p>
            <button
            className="fav-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(recipe)
                }}
                >
                    {favorites.some((fav) => fav.idMeal === recipe.idMeal) ? "❤️" : "🤍"}
            </button>
        </div>
    )
}

export default RecipeCard;