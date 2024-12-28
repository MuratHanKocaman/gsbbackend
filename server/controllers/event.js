const Event = require('../models/Event');

// Yeni etkinlik oluştur
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, badge, qrCode,image } = req.body;
        const organizer = req.user.id;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            badge,
            qrCode,
            image,
            url,
            organizer,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm etkinlikleri listele
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'name email').populate('badge');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ID ile etkinlik getir
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id).populate('organizer', 'name email').populate('badge');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aktif kullanıcının etkinliklerini listele
const getMyEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        const events = await Event.find({ organizer: userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aktif kullanıcının etkinliğini güncelle
const updateMyEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const updates = req.body;

        const event = await Event.findOne({ _id: id, organizer: userId });
        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        Object.assign(event, updates);
        const updatedEvent = await event.save();

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Aktif kullanıcının etkinliğini sil
const deleteMyEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const event = await Event.findOneAndDelete({ _id: id, organizer: userId });
        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Etkinliği güncelle
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Etkinliği sil
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Etkinlik onaylama
const approveEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.approved = true;
        await event.save();

        res.status(200).json({ message: 'Event approved successfully', event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Etkinliğe katılımcı ekle
const addParticipant = async (req, res) => {
    try {
        const { id } = req.params; // Event ID
        const participantId = req.user.id;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.participants.includes(participantId)) {
            return res.status(400).json({ message: 'User already participating in this event' });
        }

        event.participants.push(participantId);
        await event.save();

        res.status(200).json({ message: 'Participant added successfully', event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    getMyEvents,
    updateMyEvent,
    deleteMyEvent,
    updateEvent,
    deleteEvent,
    approveEvent,
    addParticipant,
};