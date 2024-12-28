const express = require('express');
// file system
const fs = require('fs');
const path = require('path');
const app = express();
//cross-origin resourse sharing
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Читаем файл orders.json
const ordersFilePath = path.join(__dirname, './orders.json');

const getOrders = () => {
  try {
    const data = fs.readFileSync(ordersFilePath, {flag: 'r'});

    console.log("tlalala", data);
    return JSON.parse(data);
  } 
  catch (error) {
    console.error('Ошибка чтения orders.json:', error.message);
    return { orders: [] };
  }
};

// Маршрут для получения заказов
app.get('/api/orders', (req, res) => {
  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading orders file');
    }
    res.json(JSON.parse(data));
  });
});

// Маршрут для получения заказа
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;Ы
  const orders = getOrders();
  const orderIndex = orders.orders.findIndex(o => o.id === parseInt(id));

  if (orderIndex !== -1) {
    orders.orders[orderIndex].status = newStatus;
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    res.json(orders.orders[orderIndex]);
  } 
  else {
    res.status(404).send('Order not found');
  }
});

// Маршрут для изменения заказа
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;
  const orders = getOrders(); 
  const orderIndex = orders.orders.findIndex(o => o.id === parseInt(id));
  
  console.log(orders);

  if (orderIndex !== -1) {
    orders.orders[orderIndex].status = newStatus;
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
    res.json(orders.orders[orderIndex]);
  } 
  else {
    res.status(404).send('Order not found');
  }
});

// Маршрут для создания нового заказа
app.post('/api/orders', (req, res) => {
  console.log(`Received ADD rewquest ${req.body}`)
  const newOrder = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading orders file');
    }

    const orders = JSON.parse(data);
    const lastOrderId = orders.orders.length ? orders.orders[orders.orders.length - 1].id : 0;
    newOrder.id = lastOrderId + 1;
    orders.orders.push(newOrder);

    console.log(orders);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving order');
      }
      res.status(201).json(newOrder); 
    });
  });
});

// Запуск сервера на порту 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
