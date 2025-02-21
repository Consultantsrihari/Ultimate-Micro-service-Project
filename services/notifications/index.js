import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory notifications database
const notifications = [
  { 
    id: 1, 
    userId: 1, 
    type: 'ORDER_CREATED',
    message: 'Your order #1 has been created',
    read: false,
    createdAt: '2024-02-20T10:00:00Z'
  }
];

app.get('/', (req, res) => {
  const userId = parseInt(req.query.userId);
  if (userId) {
    const userNotifications = notifications.filter(n => n.userId === userId);
    return res.json(userNotifications);
  }
  res.json(notifications);
});

app.post('/', (req, res) => {
  const { userId, type, message } = req.body;
  
  const notification = {
    id: notifications.length + 1,
    userId,
    type,
    message,
    read: false,
    createdAt: new Date().toISOString()
  };
  
  notifications.push(notification);
  res.status(201).json(notification);
});

app.patch('/:id/read', (req, res) => {
  const notification = notifications.find(n => n.id === parseInt(req.params.id));
  
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  notification.read = true;
  res.json(notification);
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});