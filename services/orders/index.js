import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory orders database
const orders = [
  { 
    id: 1, 
    userId: 1, 
    products: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }],
    status: 'completed',
    totalAmount: 2499.97,
    createdAt: '2024-02-20T10:00:00Z'
  }
];

app.get('/', (req, res) => {
  res.json(orders);
});

app.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/', async (req, res) => {
  try {
    const { userId, products } = req.body;
    
    // Verify inventory and calculate total
    let totalAmount = 0;
    for (const item of products) {
      const inventoryResponse = await axios.get(`http://localhost:3003/api/inventory/${item.productId}`);
      if (inventoryResponse.data.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient inventory for product ${item.productId}` });
      }
      
      const productResponse = await axios.get(`http://localhost:3002/api/products/${item.productId}`);
      totalAmount += productResponse.data.price * item.quantity;
    }

    const order = {
      id: orders.length + 1,
      userId,
      products,
      status: 'pending',
      totalAmount,
      createdAt: new Date().toISOString()
    };
    
    orders.push(order);

    // Update inventory
    for (const item of products) {
      await axios.post(`http://localhost:3003/api/inventory/${item.productId}/decrease`, {
        quantity: item.quantity
      });
    }

    // Send notification
    await axios.post('http://localhost:3005/api/notifications', {
      userId,
      type: 'ORDER_CREATED',
      message: `Order #${order.id} has been created for $${totalAmount}`
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});