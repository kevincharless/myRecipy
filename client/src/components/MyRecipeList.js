import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { hidePost } from '../redux/actions/posts';

const MyRecipeList = ({ index, recipe, setPost, setIsDelete }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        setPost(recipe);
        setIsDelete(true);
    }

    const handleHidePost = () => {
        dispatch(hidePost(recipe?._id, {...recipe, isShow: !recipe?.isShow }))
        history.push('/myrecipe')
    }

    return (
        <>
        <tr>
            <td>{index}</td>
            <td>{recipe?.title}</td>
            <td>{String(recipe?.isShow).toUpperCase()}</td>
            <td align="center">
                {recipe?._id ? (
                    <>
                    <button className="btn btn-primary btn-sm mb-2" onClick={() => handleHidePost()}>{recipe?.isShow ? 'Hide' : 'Show'}</button>
                    <Link to={`/editpost/${recipe?._id}`} className="btn btn-warning btn-sm mb-2 mx-2">Edit</Link>
                    <button className="btn btn-danger btn-sm mb-2" onClick={handleDelete}>Delete</button>
                    </>
                ) : (
                    <p>Recipe is being created</p>
                )}
                
            </td>
        </tr>
        
         </>
    )
}

export default MyRecipeList
