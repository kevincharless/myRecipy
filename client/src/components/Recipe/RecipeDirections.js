const RecipeDirections = ({ directions }) => {
    const steps = directions?.split("||")
    return (
        <div className="col-md-7 recipe-content-direction">
            <h3 className="recipe-content-subheading">Directions :</h3>
            {steps?.map((step, index) => (
                <p className="text-justify" key={index}>
                    <b>Step {index+1}</b> <br />
                    {step}
                </p>
            ))}
        </div>
    )
}

export default RecipeDirections
