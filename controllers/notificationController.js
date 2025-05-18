const Notification = require('../models/Notification');
const queue = require('../services/queueService');

exports.createNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    
    
    if (!['email', 'sms', 'in-app'].includes(type)) {
      return res.status(400).json({ error: 'Invalid notification type' });
    }

    const notification = await Notification.create({
      userId,
      type,
      message
    });

    await queue.publish({
      id: notification._id.toString(),
      userId,
      type,
      message
    });

    res.status(202).json({
      id: notification._id,
      status: 'queued'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
