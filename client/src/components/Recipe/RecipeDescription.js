const RecipeDescription = ({ image, description }) => {
    return (
        <>
            <div className="col-md-4 recipe-content-thumbnail my-auto">
                <img src={image} className="img-fluid" alt="Recipe Preview" />
            </div>
            <div className="col-md-8 recipe-content-description my-auto">
                <p className="text-justify">
                    {description}
                </p>
            </div>
        </>
    )
}

export default RecipeDescription
