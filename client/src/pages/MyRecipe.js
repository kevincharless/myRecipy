import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import MyRecipeList from '../components/MyRecipeList'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { deletePost } from '../redux/actions/posts'

const MyRecipe = ({ user, posts, isModalActive, setIsModalActive, logout  }) => {
    const dispatch = useDispatch();
    const myRecipe = posts?.posts.filter(post => post?.creator === user?.result?._id);
    const [isDelete, setIsDelete] = useState(false);
    const [post, setPost] = useState();

    const handleDeletePost = () => {
        dispatch(deletePost(post?._id));
        setIsDelete(false);
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid home-start">
                <div className="row">
                    <Sidebar user={user} setIsActive={setIsModalActive} logout={logout} />
                    <div className="col-md-9 myrecipe-content px-5 mb-5">
                        <div className="row">
                            <div className="col-12 mt-4">
                                <div className="row">
                                    <div className="col-md-6 myrecipe-content-heading">
                                    <h3>My Recipe</h3>
                                    </div>
                                    <div className="col-md-6 myrecipe-content-btn">
                                    <Link to="/addnew" className="btn btn-primary">Add Recipe</Link>
                                    </div>
                                </div>
                                <div className="row myrecipe-content-body py-3">
                                    <div className="table-responsive">
                                        {!posts?.isLoading ? (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Shown</th>
                                                    <th width="250">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myRecipe.map((recipe, index) => 
                                                    <MyRecipeList index={index+=1} recipe={recipe} setPost={setPost} setIsDelete={setIsDelete} key={index} />
                                                )}
                                            </tbody>
                                        </table>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isActive={isModalActive} setIsActive={setIsModalActive} func={logout} title="Logout Confirmation" description="Are you sure, want to logout ?" action="Yes, logout" />
                {isModalActive || isDelete ? (
                    <div className="row w-100 position-absolute" style={{ backgroundColor: 'black', height: '200vh', opacity: '10%' ,top: '0', zIndex: '99999999' }}></div>
                ) : null}
                 <Modal isActive={isDelete} setIsActive={() => setIsDelete(!isDelete)} func={handleDeletePost} title="Delete Recipe Confirmation" description={`Are you sure, want to delete "${post?.title}" ?`} action="Yes, delete it" />
            </div>
        </>
    )
}

export default MyRecipe
