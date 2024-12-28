const express = require('express');
const {
    createBadge,
    getBadges,
    getBadgeById,
    updateBadge,
    deleteBadge,
} = require('../controllers/badge');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Badges
 *   description: Badge management
 */

/**
 * @swagger
 * /badges:
 *   post:
 *     summary: Create a new badge
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               point:
 *                 type: number
 *     responses:
 *       201:
 *         description: Badge created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, isAdmin, createBadge);

/**
 * @swagger
 * /badges:
 *   get:
 *     summary: Get all badges
 *     tags: [Badges]
 *     responses:
 *       200:
 *         description: List of badges fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', getBadges);

/**
 * @swagger
 * /badges/{id}:
 *   get:
 *     summary: Get a badge by ID
 *     tags: [Badges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge ID
 *     responses:
 *       200:
 *         description: Badge fetched successfully
 *       404:
 *         description: Badge not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBadgeById);

/**
 * @swagger
 * /badges/{id}:
 *   put:
 *     summary: Update a badge by ID
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               point:
 *                 type: number
 *     responses:
 *       200:
 *         description: Badge updated successfully
 *       404:
 *         description: Badge not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, isAdmin, updateBadge);

/**
 * @swagger
 * /badges/{id}:
 *   delete:
 *     summary: Delete a badge by ID
 *     tags: [Badges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge ID
 *     responses:
 *       200:
 *         description: Badge deleted successfully
 *       404:
 *         description: Badge not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, isAdmin, deleteBadge);

module.exports = router;
