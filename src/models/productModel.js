const db = require('../database/database');

exports.getAll = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};

exports.create = async (name, description, price, stock) => {
    const result = await db.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock]
    );
    return result.rows[0];
};
