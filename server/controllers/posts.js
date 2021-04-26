import mongoose from 'mongoose';
import Post from '../models/post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({"createdAt": -1});
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPopularPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        posts.sort((a, b) => {
            return b.likes.length - a.likes.length;
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) =>{
    const post = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    const newPost = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const hidePost = async (req, res) =>{
    const { id } = req.params;
    const post = req.body

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await Post.findByIdAndUpdate(id, { ...post, isShow: post.isShow }, { new: true });

    res.json(updatedPost);
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.json(404).send('No post with that id');

    const updatedPost = await Post.findByIdAndUpdate(id, { ...post, id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await Post.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);

    const comment = req.body;
    post.comments.push({ ...comment, creator: req.userId, createdAt: new Date().toISOString() });

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const updateCommentPost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    const comment = req.body;

    const commentPost = await post.comments.find(c => c._id == comment._id);
    commentPost.comment = comment.comment;
    
    await post.save();
    const updatedPost = await Post.findByIdAndUpdate(id, post);

    res.json(updatedPost);
}

export const deleteCommentPost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);
    const reqComment = req.body;
    
    post.comments = post.comments.filter(comment => comment._id != reqComment._id);

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}