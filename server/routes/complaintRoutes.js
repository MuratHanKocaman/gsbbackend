const express = require('express');
const {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
} = require('../controllers/complaint');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaint management
 */

/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentId:
 *                 type: string
 *                 description: ID of the content being reported
 *               contentType:
 *                 type: string
 *                 enum: [event, announcement, forumPost]
 *                 description: Type of content being reported
 *               note:
 *                 type: string
 *                 description: Complaint note
 *     responses:
 *       201:
 *         description: Complaint created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, createComplaint);

/**
 * @swagger
 * /complaints:
 *   get:
 *     summary: Get all complaints (Admin only)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of complaints
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyToken, isAdmin, getAllComplaints);

/**
 * @swagger
 * /complaints/{id}:
 *   put:
 *     summary: Update complaint status (Admin only)
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, reviewed]
 *     responses:
 *       200:
 *         description: Complaint status updated successfully
 *       404:
 *         description: Complaint not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifyToken, isAdmin, updateComplaintStatus);

module.exports = router;