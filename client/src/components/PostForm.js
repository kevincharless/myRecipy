import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createPost, updatePost } from '../redux/actions/posts';

const PostForm = ({ editPost, user, post, formTitle, firstButton, firstButtonFunc, secondButton }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({ title: '', selectedFile: '', videoLink: '', description: '', ingredients: '', direction: '' });

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (editPost) {
            dispatch(updatePost(post?._id, formData));
        } else {
            dispatch(createPost({ ...formData, name: user.name, isShow: true, creator: user?._id, likes: [] }));
        }
        history.push('/myrecipe');
    }

    useEffect(() => {
        if (post) {
            setFormData(post)
        }
    }, [post])

    return (
        <form className="col-12 mt-4" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 addrecipe-content-heading">
                    <h3>{formTitle}</h3>
                </div>
                <div className="col-md-6 addrecipe-content-btn">
                    {firstButton && (
                        <button className="btn btn-secondary me-2" onClick={() => firstButtonFunc()}>{firstButton}</button>
                    )}
                    <button type="submit" className="btn btn-primary">{secondButton}</button>
                </div>
            </div>
            <div className="row addrecipe-content-body py-3">
                <div className="row">
                    <div className="form-group col-md-12">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" onChange={handleChange} value={formData?.title} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Thumbnail</label>
                        <div className="border rounded p-1">
                            <FileBase
                                name="selectedFile"
                                multiple={false}
                                onDone={({base64}) => setFormData({ ...formData, selectedFile: base64 })}
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Video Link (optional)</label>
                        <input type="text" className="form-control" name="videoLink" onChange={handleChange} value={formData?.videoLink}  />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Description</label>
                        <textarea className="form-control" rows="5" name="description" onChange={handleChange} value={formData?.description}></textarea>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Tools &amp; Ingredients</label>
                        <textarea className="form-control" rows="5" name="ingredients" onChange={handleChange} value={formData?.ingredients}></textarea>
                    </div>
                    <div className="form-group col-md-12">
                        <label>Direction</label>
                        <textarea className="form-control" rows="20" name="direction" onChange={handleChange} value={formData?.direction}></textarea>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostForm
