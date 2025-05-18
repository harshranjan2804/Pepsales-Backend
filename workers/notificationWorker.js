require('dotenv').config();
const amqp = require('amqplib');
const Notification = require('../models/Notification');
const { sendNotification } = require('../services/notificationService');
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('notifications', { durable: true });
  channel.prefetch(1);

  console.log('Worker is waiting for messages in notifications queue...');
  channel.consume('notifications', async (msg) => {
    if (msg) {
      const notification = JSON.parse(msg.content.toString());
      await sendNotification(notification);
      channel.ack(msg);
    }
  });
})();
