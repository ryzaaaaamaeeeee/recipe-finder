
function RecipeModal({recipe, onClose}) {
    if (!recipe) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose}>X</button>
                <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <h2>{recipe.strMeal}</h2>
                <p>{recipe.strCategory} | {recipe.strArea}</p>
                <p>{recipe.strInstructions}</p>
                {recipe.strYoutube && (
                    <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
                        Watch on Youtube.
                    </a>
                )}
            </div>
        </div>
    )
}

export default RecipeModal;