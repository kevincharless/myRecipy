const RecipeTitle = ({title}) => {
    return (
        <h3 className="recipe-content-heading">{title.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</h3>
    )
}

export default RecipeTitle
