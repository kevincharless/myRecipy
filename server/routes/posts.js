import express from 'express';

import { getPosts, getPopularPosts, createPost, updatePost, deletePost, likePost, commentPost, updateCommentPost, deleteCommentPost, hidePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/popular', getPopularPosts);
router.post('/', auth, createPost);
router.patch('/:id/hidePost', auth, hidePost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/commentPost', auth, commentPost);
router.patch('/:id/updateCommentPost', auth, updateCommentPost);
router.patch('/:id/deleteCommentPost', auth, deleteCommentPost);


export default router;