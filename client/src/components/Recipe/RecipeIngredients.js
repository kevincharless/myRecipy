const RecipeIngredients = ({ ingredients }) => {
    const recipeIngredients = ingredients?.split(";")
    return (
        <div className="col-12 recipe-content-ingredients mt-5">
            <h3 className="recipe-content-subheading">Ingredients :</h3>
            <ol>
                {recipeIngredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ol>
        </div>
    )
}

export default RecipeIngredients
