const Complaint = require('../models/Complaint');

// Şikayet oluşturma
const createComplaint = async (req, res) => {
    try {
        const { contentId, contentType, note } = req.body;

        if (!contentId || !contentType || !note) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newComplaint = new Complaint({
            contentId,
            contentType,
            reportedBy: req.user.id,
            note,
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm şikayetleri listeleme (Admin için)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('reportedBy', 'name email');
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Şikayetin durumunu güncelleme (Admin için)
const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'reviewed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
};
