const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/database/database');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
