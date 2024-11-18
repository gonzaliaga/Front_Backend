// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/middleware');

// Crear producto (solo admin)
router.post('/', protect, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto' });
    }
});

// Obtener productos
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Actualizar producto
router.put('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
});

// Eliminar producto
router.delete('/:id', protect, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
});

module.exports = router;