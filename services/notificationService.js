const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Notification = require('../models/Notification');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendNotification(notification) {
  try {
    if (notification.type === 'email') {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: notification.userId,
        subject: 'Notification',
        text: notification.message,
      });
    } else if (notification.type === 'sms') {
      await twilioClient.messages.create({
        body: notification.message,
        from: process.env.TWILIO_PHONE,
        to: notification.userId,
      });
    }

    await Notification.findByIdAndUpdate(notification.id, { status: 'sent' });
  } catch (err) {
  
    const notif = await Notification.findById(notification.id);
    if (notif.retryCount < 3) {
      await Notification.findByIdAndUpdate(notification.id, {
        $inc: { retryCount: 1 },
        status: 'queued'
      });
      setTimeout(() => sendNotification(notification), 5000 * (notif.retryCount + 1));
    } else {
      await Notification.findByIdAndUpdate(notification.id, { status: 'failed' });
    }
  }
}

module.exports = { sendNotification };
