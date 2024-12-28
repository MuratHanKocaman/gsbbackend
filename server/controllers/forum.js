const Forum = require('../models/Forum');

// Yeni gönderi oluştur
const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const author = req.user.id;

        const newPost = new Forum({
            title,
            content,
            author,
            tags,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm gönderileri listele
const getPosts = async (req, res) => {
    try {
        const posts = await Forum.find().populate('author', 'name email').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ID ile gönderi getir
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Forum.findById(id).populate('author', 'name email').populate('comments.user', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Gönderiyi güncelle
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const post = await Forum.findOneAndUpdate({ _id: id, author: req.user.id }, updates, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or not authorized' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Gönderiyi sil
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Forum.findOneAndDelete({ _id: id, author: req.user.id });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or not authorized' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Yorum ekle
const addComment = async (req, res) => {
    try {
        const { id } = req.params; // Post ID
        const { content } = req.body;
        const user = req.user.id;

        const post = await Forum.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({ user, content });
        await post.save();

        res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Beğeni ekle veya kaldır
const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Forum.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const index = post.likes.indexOf(userId);
        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(index, 1);
        }

        await post.save();
        res.status(200).json({ message: 'Like toggled successfully', post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Disslike ekle veya kaldır
const toggledisslike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Forum.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const index = post.disslikes.indexOf(userId);
        if (index === -1) {
            post.likes.push(userId);
        } else {
            post.likes.splice(index, 1);
        }

        await post.save();
        res.status(200).json({ message: 'Disslike toggled successfully', post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment,
    toggleLike,
    toggledisslike,
};