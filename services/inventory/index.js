import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory inventory database
const inventory = [
  { productId: 1, quantity: 50, lastUpdated: '2024-02-20T10:00:00Z' },
  { productId: 2, quantity: 30, lastUpdated: '2024-02-20T10:00:00Z' }
];

app.get('/', (req, res) => {
  res.json(inventory);
});

app.get('/:productId', (req, res) => {
  const item = inventory.find(i => i.productId === parseInt(req.params.productId));
  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  res.json(item);
});

app.post('/:productId/decrease', (req, res) => {
  const { quantity } = req.body;
  const item = inventory.find(i => i.productId === parseInt(req.params.productId));
  
  if (!item) {
    return res.status(404).json({ error: 'Inventory item not found' });
  }
  
  if (item.quantity < quantity) {
    return res.status(400).json({ error: 'Insufficient inventory' });
  }

  item.quantity -= quantity;
  item.lastUpdated = new Date().toISOString();
  
  res.json(item);
});

app.post('/:productId/increase', (req, res) => {
  const { quantity } = req.body;
  const item = inventory.find(i => i.productId === parseInt(req.params.productId));
  
  if (!item) {
    return res.status(404).json({ error: 'Inventory item not found' });
  }

  item.quantity += quantity;
  item.lastUpdated = new Date().toISOString();
  
  res.json(item);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Inventory Service running on port ${PORT}`);
});