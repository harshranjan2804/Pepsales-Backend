const amqp = require('amqplib');

let channel = null;

async function connectQueue() {
  if (channel) return channel;
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('notifications', { durable: true });
  return channel;
}

async function publishToQueue(notification) {
  const ch = await connectQueue();
  ch.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)), { persistent: true });
}

module.exports = { publishToQueue };
