# Notification Service Backend

A backend API for sending notifications via Email, SMS, and In-App using Node.js, Express, MongoDB, and RabbitMQ.

## 🚀 Features

- Send notifications (Email, SMS, In-App)
- Asynchronous processing with RabbitMQ
- Retry logic for failed notifications

## 📚 API Docs

See full API documentation and examples here:  
👉 [Postman Docs](https://documenter.getpostman.com/view/44748007/2sB2qXjNGp)

## ⚙️ Quick Start

1. Clone the repo & install dependencies:

git clone https://github.com/harshranjan2804/Pepsales-Backend.git
cd Pepsales-Backend
npm install

text 2. Create a `.env` file with your config:
MONGO_URI=...
EMAIL_USER=...
EMAIL_PASS=...
TWILIO_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE=...
RABBITMQ_URL=amqp://localhost:5672
PORT=3000

text 3. Start RabbitMQ (Docker):
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

text 4. Start the server:
npm run dev

text 5. Start the worker (in a new terminal):
node workers/notificationWorker.js

text

## 🧪 Testing

- Use the [Postman Docs](https://documenter.getpostman.com/view/44748007/2sB2qXjNGp) to test all endpoints.

---
