const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await productModel.getById(id);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
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

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const result = await productModel.update(id, name, description, price, stock);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await productModel.delete(id);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};
