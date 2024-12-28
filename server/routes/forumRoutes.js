const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment,
    toggleLike,
    toggledisslike,
} = require('../controllers/forum');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Forums
 *   description: Forum management and interaction
 */

/**
 * @swagger
 * /forums:
 *   post:
 *     summary: Create a new forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Forum post created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, createPost);

/**
 * @swagger
 * /forums:
 *   get:
 *     summary: Get all forum posts
 *     tags: [Forums]
 *     responses:
 *       200:
 *         description: List of forum posts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', getPosts);

/**
 * @swagger
 * /forums/{id}:
 *   get:
 *     summary: Get a forum post by ID
 *     tags: [Forums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Forum post fetched successfully
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /forums/{id}:
 *   put:
 *     summary: Update a forum post by ID
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Forum post updated successfully
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, updatePost);

/**
 * @swagger
 * /forums/{id}:
 *   delete:
 *     summary: Delete a forum post by ID
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Forum post deleted successfully
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, deletePost);

/**
 * @swagger
 * /forums/{id}/comments:
 *   post:
 *     summary: Add a comment to a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/comments', verifyToken, addComment);

/**
 * @swagger
 * /forums/{id}/likes:
 *   post:
 *     summary: Toggle like on a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Like toggled successfully
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/likes', verifyToken, toggleLike);

/**
 * @swagger
 * /forums/{id}/likes:
 *   post:
 *     summary: Toggle like on a forum post
 *     tags: [Forums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Forum post ID
 *     responses:
 *       200:
 *         description: Disslike toggled successfully
 *       404:
 *         description: Forum post not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/disslikes', verifyToken, toggledisslike);

module.exports = router;
