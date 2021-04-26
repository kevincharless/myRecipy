import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '../assets/img/avatar-default.png';
import { commentPost, updateCommentPost } from '../redux/actions/posts';

const CommentSection = ({ post, user, setDeleteModal, comment, commentData, setCommentData, currentCommentId, setCurrentCommentId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setCommentData(comment);
    }, [comment, setCommentData])

    const handleComment = e => {
        setCommentData({
            _id: currentCommentId,
            name: user.name,
            comment: e.target.value
        })
    }

    const clearComment = () => {
        setCommentData({ _id: '', name: '', comment: '' });
        setCurrentCommentId();
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(currentCommentId) {
            dispatch(updateCommentPost(post._id, commentData));
        } else {
            dispatch(commentPost(post._id, commentData));
        }
        clearComment();   
    }

    const handleDelete = (id) => {
        setCurrentCommentId(id);
        setDeleteModal(true);
    }

    return (
        <div className="col-12 recipe-comment mt-5">
            <h3 className="recipe-content-subheading">Comments</h3>
                {user && (
                    <form className="comment-box row" onSubmit={handleSubmit}>
                        <div className="col-1">
                            <img src={Avatar} className="rounded-circle" width="50" alt="avatar" />
                        </div>
                        <div className="col-11">
                            <h5>{user?.name}</h5>
                            <textarea className="form-control" rows="3" placeholder="Leave your comment" value={commentData?.comment} onChange={handleComment}></textarea> 
                        </div>
                        <div className="col-12 btn-action d-flex justify-content-end">
                            <button type="submit" className="btn btn-warning mt-2">Submit</button>
                        </div>
                    </form>
                )}
            {post?.comments.map((comment, index) => (
                <div className="comment-box row my-3" key={index}>
                    <div className="col-1">
                        <img src={Avatar} className="rounded-circle" width="50" alt="avatar" />
                    </div>
                    <div className="col-11">
                        <div className="row">
                            <div className="col-6">
                                <h5>{comment?.name}</h5>
                            </div>
                            {comment?.creator === user?._id && (
                                <div className="col-6 d-flex justify-content-end">
                                    <div>
                                        <button className="btn btn-warning me-2" onClick={() => setCurrentCommentId(comment?._id)}>edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(comment?._id)}>delete</button>
                                    </div>
                                </div>
                            )}
                          
                        </div>
                        {comment?.comment || comment?.comment?.comment}
                    </div>
                </div>
            ))}

           

            {/* <div className="comment-box row">
                <div className="col-1">
                    <img src={Avatar} className="rounded-circle" width="50" alt="avatar" />
                </div>
                <div className="col-11">
                    <h5>Applebaum</h5>
                    Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                </div>

                <div className="reply-comment-box row">
                    <div className="col-1"></div>
                        <div className="col-1">
                            <img src={Avatar} className="rounded-circle" width="50" alt="avatar" />
                        </div>
                    <div className="col-10">
                        <h5>Lauren</h5>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse
                    </div>
                </div>

                <div className="reply-comment-box row">
                    <div className="col-1"></div>
                        <div className="col-1">
                            <img src={Avatar} className="rounded-circle" width="50" alt="avatar" />
                        </div>
                    <div className="col-10">
                        <h5>Isadore</h5>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>

            </div> */}
        </div>
    )
}

export default CommentSection
