const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { publishToQueue } = require('../services/queueService');


router.post('/', async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    if (!['email', 'sms', 'in-app'].includes(type)) {
      return res.status(400).json({ error: 'Invalid notification type' });
    }
    const notification = await Notification.create({ userId, type, message });
    await publishToQueue({
      id: notification._id,
      userId,
      type,
      message
    });
    res.status(202).json({ id: notification._id, status: 'queued' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/users/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
