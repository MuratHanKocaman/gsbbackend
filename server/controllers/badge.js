const Badge = require('../models/Badge');

// Yeni rozet oluştur
const createBadge = async (req, res) => {
    try {
        const { name, description, icon, point } = req.body;

        const newBadge = new Badge({
            name,
            description,
            icon,
            point,
        });

        const savedBadge = await newBadge.save();
        res.status(201).json(savedBadge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm rozetleri listele
const getBadges = async (req, res) => {
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ID ile rozet getir
const getBadgeById = async (req, res) => {
    try {
        const { id } = req.params;

        const badge = await Badge.findById(id);
        if (!badge) {
            return res.status(404).json({ message: 'Badge not found' });
        }

        res.status(200).json(badge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rozeti güncelle
const updateBadge = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedBadge = await Badge.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }

        res.status(200).json(updatedBadge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rozeti sil
const deleteBadge = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBadge = await Badge.findByIdAndDelete(id);
        if (!deletedBadge) {
            return res.status(404).json({ message: 'Badge not found' });
        }

        res.status(200).json({ message: 'Badge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBadge,
    getBadges,
    getBadgeById,
    updateBadge,
    deleteBadge,
};