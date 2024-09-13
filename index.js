const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/database/database');

const app = express();

app.use(bodyParser.json());

app.get('/products', async (req, res) => {
    try {
    const result = await db.query('SELECT * FROM products');
    res.status(200).json(result.rows);
    } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
    }
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(result.rows[0]);
    } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios' });
    }

    try {
        const result = await db.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
        [name, description, price, stock, id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(result.rows[0]);
    } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

const productRoutes = require('./src/routes/productRoutes');
app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
