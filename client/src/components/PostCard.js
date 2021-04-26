import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
    return (
        <div className="col-md-4 col-6 mb-4">
            <Link to={`/recipe/${post?._id}`}>
                <div className="card">
                    <img src={post?.selectedFile} className="card-img-top" alt="Recipe" />
                    <div className="card-body">
                        <p className="card-text">{post?.title}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostCard
