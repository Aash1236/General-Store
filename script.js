const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5500;

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('connected to the database');
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

app.use(express.json());

app.post('/api/products', async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Product({ name, price});
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product'});
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product'});
    }
});

app.delete('/app/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product'});
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});