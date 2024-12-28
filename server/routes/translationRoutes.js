const express = require('express');
const TranslationService = require('../controllers/translation');

const router = express.Router();
const translationService = new TranslationService();

/**
 * @swagger
 * tags:
 *   name: Translations
 *   description: Translation management
 */

/**
 * @swagger
 * /translations/{lang}:
 *   get:
 *     summary: Get all translations for a language
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: lang
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code (e.g., 'en', 'tr')
 *     responses:
 *       200:
 *         description: List of translations in key-value format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *       404:
 *         description: No translations found for the given language
 *       500:
 *         description: Internal server error
 */
router.get('/:lang', async (req, res) => {
    const { lang } = req.params;

    try {
        const translations = await translationService.getTranslationsByLang(lang);
        if (!translations.length) {
            return res.status(404).json({ message: `No translations found for language: ${lang}` });
        }

        // Çevirileri anahtar-değer şeklinde döndür
        const response = translations.reduce((acc, t) => {
            acc[t.key] = t.value;
            return acc;
        }, {});

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /translations/add:
 *   post:
 *     summary: Add a new translation
 *     tags: [Translations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lang:
 *                 type: string
 *                 description: Language code (e.g., 'en', 'tr')
 *               key:
 *                 type: string
 *                 description: Translation key
 *               value:
 *                 type: string
 *                 description: Translation value
 *     responses:
 *       201:
 *         description: Translation added successfully
 *       500:
 *         description: Internal server error
 */
router.post('/add', async (req, res) => {
    const { lang, key, value } = req.body;

    try {
        const translation = await translationService.addTranslation(lang, key, value);
        res.status(201).json(translation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;