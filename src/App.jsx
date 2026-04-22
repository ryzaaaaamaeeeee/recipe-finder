import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm.jsx";
import CategoryFilter from "./components/CategoryFilter.jsx";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("search");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  async function searchRecipes(e) {
    e.preventDefault();
    if (query.trim() === "") return;

    setLoading(true);

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );
    const data = await response.json();

    setRecipes(data.meals || []);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
      );
      const data = await response.json();
      setCategories(data.categories || []);
    }

    fetchCategories();
  }, []);

  async function filterByCategory(category) {
    setLoading(true);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const data = await response.json();

    setRecipes(data.meals || []);
    setLoading(false);
  }

  async function fetchRecipeDetails(idMeal) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`,
    );
    const data = await response.json();
    setSelectedRecipe(data.meals[0]);
  }

  async function toggleFavorite(recipe) {
    let fullRecipe = recipe;

    if (!recipe.strInstructions) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`,
      );
      const data = await response.json();
      fullRecipe = data.meals[0];
    }

    const isFavorite = favorites.some(
      (fav) => fav.idMeal === fullRecipe.idMeal,
    );

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== fullRecipe.idMeal,
      );
    } else {
      updatedFavorites = [...favorites, fullRecipe];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  return (
    <div className="app">
      <header>
        <h1>Recipe Finder</h1>
        <p>Cook your favorites.</p>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          {" "}
          Search
        </button>
        <button
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites ❤️
        </button>
      </div>

      {activeTab === "search" && (
        <>
          <SearchForm
            onSearch={searchRecipes}
            query={query}
            setQuery={setQuery}
          />
          <CategoryFilter categories={categories} onFilter={filterByCategory} />

          {/* Spinner */}
          {loading && <div className="spinner"></div>}
          {!loading && recipes.length === 0 && query !== "" && (
            <p>No recipe found.</p>
          )}

          {/* View Recipes */}

          <div className="recipes-grid">
            {!loading &&
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onSelect={fetchRecipeDetails}
                  onFavorite={toggleFavorite}
                  favorites={favorites}
                />
              ))}
          </div>
        </>
      )}

      {activeTab === "favorites" && (
        <div className="recipes-grid">
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onSelect={fetchRecipeDetails}
                onFavorite={toggleFavorite}
                favorites={favorites}
              />
            ))
          )}
        </div>
      )}

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}

export default App;