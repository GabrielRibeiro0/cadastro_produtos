const db = require('../database/database');

exports.getAll = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};

exports.getById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows;
};

exports.create = async (name, description, price, stock) => {
    const result = await db.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock]
    );
    return result.rows[0];
};

exports.update = async (id, name, description, price, stock) => {
    const result = await db.query(
        'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
        [name, description, price, stock, id]
    );
    return result.rows;
};

exports.delete = async (id) => {
    const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return result.rows;
};
