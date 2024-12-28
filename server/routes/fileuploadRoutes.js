const express = require('express');
const {
    upload,
    uploadFile,
    getAllFiles,
    getUserFiles,
    deleteFile,
    getFileById,
} = require('../controllers/fileupload');
const { verifyToken } = require('../middleware/authMiddleware');
const FileUpload = require("../models/FileUpload");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FileUploads
 *   description: File upload and management
 */

/**
 * @swagger
 * /fileupload:
 *   post:
 *     summary: Upload a file
 *     tags: [FileUploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 filePath:
 *                   type: string
 *                 fileType:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */
router.post('/', verifyToken, upload.single('file'), uploadFile);

/**
 * @swagger
 * /fileupload:
 *   get:
 *     summary: Get all uploaded files
 *     tags: [FileUploads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all uploaded files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyToken, getAllFiles);

/**
 * @swagger
 * /fileupload/my:
 *   get:
 *     summary: Get files uploaded by the logged-in user
 *     tags: [FileUploads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user-uploaded files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/my', verifyToken, getUserFiles);

/**
 * @swagger
 * /fileupload/{id}:
 *   delete:
 *     summary: Delete an uploaded file by ID
 *     tags: [FileUploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifyToken, deleteFile);

/**
 * @swagger
 * /fileupload/{id}/view:
 *   get:
 *     summary: Get and return the file by ID
 *     tags: [FileUploads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to view
 *     responses:
 *       200:
 *         description: File returned successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id/view', verifyToken, getFileById);


module.exports = router;
