const express = require('express');
const {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
    approveAnnouncement,
    getMyAnnouncements,
    updateMyAnnouncement,
    deleteMyAnnouncement,
} = require('../controllers/announcement');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Announcement management
 */

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcements]
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
 *               image:
 *                 type: string
 *                 description: FileId
 *               organization:
 *                 type: string
 *                 description: Organization ID
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, createAnnouncement);

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: List of announcements fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', getAnnouncements);

/**
 * @swagger
 * /announcements/my:
 *   get:
 *     summary: Get announcements created by the logged-in user
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's announcements fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/my', verifyToken, getMyAnnouncements);

/**
 * @swagger
 * /announcements/my/{id}:
 *   put:
 *     summary: Update an announcement created by the logged-in user
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
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
 *               image:
 *                 type: string
 *                 description: FileId
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.put('/my/:id', verifyToken, updateMyAnnouncement);

/**
 * @swagger
 * /announcements/my/{id}:
 *   delete:
 *     summary: Delete an announcement created by the logged-in user
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.delete('/my/:id', verifyToken, deleteMyAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get an announcement by ID
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
 *     responses:
 *       200:
 *         description: Announcement fetched successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getAnnouncementById);

/**
 * @swagger
 * /announcements/{id}:
 *   put:
 *     summary: Update an announcement by ID
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
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
 *               image:
 *                 type: string
 *                 description: FileId
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, updateAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete an announcement by ID
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, isAdmin, deleteAnnouncement);

/**
 * @swagger
 * /announcements/{id}/approve:
 *   put:
 *     summary: Approve an announcement by ID
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement ID
 *     responses:
 *       200:
 *         description: Announcement approved successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/approve', verifyToken, isAdmin, approveAnnouncement);

module.exports = router;
