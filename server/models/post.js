import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    videoLink: String,
    description: String,
    ingredients: String,
    direction: String,
    name: String,
    creator: String,
    isShow: {
        type: Boolean,
        default: true
    },
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: [
        {
            name: String,
            creator: String,
            comment: String,
            createdAt: Date
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;