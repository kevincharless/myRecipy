import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useParams } from 'react-router'
import CommentSection from '../components/CommentSection'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'
import RecipeDescription from '../components/Recipe/RecipeDescription'
import RecipeDirections from '../components/Recipe/RecipeDirections'
import RecipeIngredients from '../components/Recipe/RecipeIngredients'
import RecipeTitle from '../components/Recipe/RecipeTitle'
import RecipeVideo from '../components/Recipe/RecipeVideo'
import Sidebar from '../components/Sidebar'
import { deleteCommentPost, likePost } from '../redux/actions/posts';

const Recipe = ({ user, posts, isModalActive, setIsModalActive, logout }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const post = posts.posts.filter(post => post._id === id )[0];
    const [postLike, setPostLike] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const [currentCommentId, setCurrentCommentId] = useState();
    const [commentData, setCommentData] = useState({ _id: '', name: '', comment: '' })
    const comment = currentCommentId ? post.comments.find(c => c._id === currentCommentId) : commentData;
    const [deleteModal, setDeleteModal] = useState(false);
    

    useEffect(() => {
        post?.likes.includes(user?.result._id) && setIsLike(true);

        setPostLike(post?.likes?.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])

    const handleLike = () => {
        setIsLike(!isLike);
        if(isLike === false) {
            setPostLike(postLike + 1);
        } else {
            setPostLike(postLike - 1);
        }
        dispatch(likePost(post._id))
    }

    const Likes = () => {
        if (isLike) {
            return (
                <>
                    <i className="fa fa-heart fs-3 me-1" onClick={user && handleLike} style={{ cursor: user ? 'pointer' : 'default' }}></i>
                    &nbsp;{postLike > 2 ? `You and ${postLike - 1} others` : `${postLike} like${postLike > 1 ? 's' : ''}`}
                </>)
        } else {
            return (
                <>
                    <i className="fa fa-heart-o fs-3 me-1" onClick={user && handleLike} style={{ cursor: user ? 'pointer' : 'default' }}></i>
                    &nbsp;{postLike} {postLike <= 1 ? 'Like' : 'Likes'}
                </>)
        }
    };

    const handleDeleteComment = () => {
        dispatch(deleteCommentPost(post._id, comment));
        setCommentData({ _id: '', name: '', comment: '' });
        setDeleteModal(false);
    }
    return (
        <div>
            <Navbar />
            <div className="container-fluid home-start">
                <div className="row">
                    <Sidebar user={user} setIsActive={setIsModalActive} logout={logout} />
                    <div className="col-md-9 recipe-content px-5 mb-5">
                        <div className="row">
                            <div className="col-12 mt-4">
                                {posts.isLoading ? (
                                    <h3 className="m-0">Loading...</h3>
                                ) : (
                                    <>
                                    <div className="row">
                                        <div className="col-6">
                                            <RecipeTitle title={post?.title} />
                                            Recipe by : {post?.name}

                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <div>
                                                <Likes />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row recipe-content-body py-3">
                                        <RecipeDescription image={post?.selectedFile} description={post?.description} />
                                        <RecipeIngredients ingredients={post?.ingredients}  />
                                        <RecipeDirections directions={post?.direction} />
                                        <RecipeVideo videoLink={post?.videoLink} />
                                        <CommentSection
                                            user={user?.result} 
                                            post={post} 
                                            setDeleteModal={setDeleteModal}
                                            comment={comment}
                                            commentData={commentData}
                                            setCommentData={setCommentData}
                                            currentCommentId={currentCommentId}
                                            setCurrentCommentId={setCurrentCommentId}
                                        />
                                    </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                <Modal isActive={isModalActive} setIsActive={setIsModalActive} func={logout} title="Logout Confirmation" description="Are you sure, want to logout ?" action="Yes, logout" />
                {isModalActive || deleteModal ? (
                    <div className="row w-100 h-100 position-absolute" style={{ backgroundColor: 'black', opacity: '10%' ,top: '0', zIndex: '9999' }}></div>
                ) : null}
                <Modal isActive={deleteModal} setIsActive={setDeleteModal} func={handleDeleteComment} title="Delete Confirmation" description={`Are you sure, want to delete ${commentData?.comment} ?`} action="Yes, delete it" />

            </div>
        </div>
    )
}

export default Recipe
