import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(cors());
app.use(express.json());

// Proxy configuration
const userServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {'^/api/users': ''}
});

const productServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {'^/api/products': ''}
});

const inventoryServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {'^/api/inventory': ''}
});

const orderServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true,
  pathRewrite: {'^/api/orders': ''}
});

const notificationServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3005',
  changeOrigin: true,
  pathRewrite: {'^/api/notifications': ''}
});

// Routes
app.use('/api/users', userServiceProxy);
app.use('/api/products', productServiceProxy);
app.use('/api/inventory', inventoryServiceProxy);
app.use('/api/orders', orderServiceProxy);
app.use('/api/notifications', notificationServiceProxy);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});