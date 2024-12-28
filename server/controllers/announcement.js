const Announcement = require('../models/Announcement');

// Yeni duyuru oluştur
const createAnnouncement = async (req, res) => {
    try {
        const { title, content, image, organization } = req.body;

        const newAnnouncement = new Announcement({
            title,
            content,
            image,
            organization,
        });

        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json(savedAnnouncement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm duyuruları listele
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().populate('organization', 'name email');
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ID ile duyuru getir
const getAnnouncementById = async (req, res) => {
    try {
        const { id } = req.params;

        const announcement = await Announcement.findById(id).populate('organization', 'name email');
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aktif kullanıcının duyurularını listele
const getMyAnnouncements = async (req, res) => {
    try {
        const userId = req.user.id;

        const myAnnouncements = await Announcement.find({ organization: userId });
        res.status(200).json(myAnnouncements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aktif kullanıcının duyurusunu güncelle
const updateMyAnnouncement = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const updates = req.body;

        const announcement = await Announcement.findOne({ _id: id, organization: userId });
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found or not authorized' });
        }

        Object.assign(announcement, updates);
        const updatedAnnouncement = await announcement.save();

        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aktif kullanıcının duyurusunu sil
const deleteMyAnnouncement = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const announcement = await Announcement.findOneAndDelete({ _id: id, organization: userId });
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found or not authorized' });
        }

        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Duyuruyu güncelle
const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedAnnouncement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Duyuruyu sil
const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Duyuruyu onayla
const approveAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        const announcement = await Announcement.findById(id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        announcement.approved = true;
        await announcement.save();

        res.status(200).json({ message: 'Announcement approved', announcement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAnnouncement,
    getAnnouncements,
    getAnnouncementById,
    getMyAnnouncements,
    updateMyAnnouncement,
    deleteMyAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    approveAnnouncement,
};