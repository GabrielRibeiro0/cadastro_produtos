const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios' });
    }

    try {
        const newProduct = await productModel.create(name, description, price, stock);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};