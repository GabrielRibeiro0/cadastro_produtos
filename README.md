# Cadastro de Produtos

Este é um projeto para uma API de cadastro de produtos usando Node.js e Express, com PostgreSQL como banco de dados. A API permite criar, listar, atualizar e deletar produtos.

## Requisitos

- Node.js
- PostgreSQL

## Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/GabrielRibeiro0/cadastro_produtos.git
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd cadastro_produtos
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Configure o banco de dados:**

    Crie um banco de dados PostgreSQL com o nome `produtosdb` e configure as credenciais no arquivo `src/database/database.js`.

    ```javascript
    const pool = new Pool({
        user: 'seu_usuario',      // Altere para seu usuário do PostgreSQL
        host: 'localhost',    // Altere se seu banco de dados estiver em outro host
        database: 'nome_do_banco', // Nome do banco de dados
        password: 'sua_senha',     // Altere para sua senha do PostgreSQL
        port: 5432,           // Porta padrão do PostgreSQL
    });
    ```

5. **Crie a tabela `products` no banco de dados:**

    Utilize o seguinte comando SQL para criar a tabela:

    ```sql
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(500),
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL
    );
    ```

6. **Inicie o servidor:**

    ```bash
    npm start
    ```

    O servidor estará disponível em `http://localhost:3000`.

## Endpoints

### Listar todos os produtos

- **URL:** `/products`
- **Método:** GET
- **Resposta:** Lista de produtos em formato JSON.

    ```json
    [
        {
            "id": 1,
            "name": "Produto 1",
            "description": "Descrição do Produto 1",
            "price": 100.00,
            "stock": 10
        },
        ...
    ]
    ```

### Buscar um produto específico

- **URL:** `/products/:id`
- **Método:** GET
- **Resposta:** Produto encontrado em formato JSON.

    ```json
    {
        "id": 1,
        "name": "Produto 1",
        "description": "Descrição do Produto 1",
        "price": 100.00,
        "stock": 10
    }
    ```

### Criar um novo produto

- **URL:** `/products`
- **Método:** POST
- **Payload:**

    ```json
    {
        "name": "Novo Produto",
        "description": "Descrição do Novo Produto",
        "price": 150.00,
        "stock": 20
    }
    ```

- **Resposta:** Produto criado em formato JSON.

    ```json
    {
        "id": 2,
        "name": "Novo Produto",
        "description": "Descrição do Novo Produto",
        "price": 150.00,
        "stock": 20
    }
    ```

### Atualizar um produto

- **URL:** `/products/:id`
- **Método:** PUT
- **Payload:**

    ```json
    {
        "name": "Produto Atualizado",
        "description": "Descrição Atualizada",
        "price": 200.00,
        "stock": 30
    }
    ```

- **Resposta:** Produto atualizado em formato JSON.

    ```json
    {
        "id": 1,
        "name": "Produto Atualizado",
        "description": "Descrição Atualizada",
        "price": 200.00,
        "stock": 30
    }
    ```

### Deletar um produto

- **URL:** `/products/:id`
- **Método:** DELETE
- **Resposta:** Mensagem de sucesso em formato JSON.

    ```json
    {
        "message": "Produto deletado com sucesso"
    }
    ```

## Estrutura do Projeto

- **`index.js`**: Configuração do servidor Express e definição das rotas.
- **`src/models/productModel.js`**: Funções para interação com o banco de dados.
- **`src/controllers/productController.js`**: Lógica de controle das rotas.
- **`src/database/database.js`**: Configuração da conexão com o banco de dados.
- **`src/routes/productRoutes.js`**: Definição das rotas de produtos.

## Contato

- **LinkedIn:** [Carlos Gabriel Ribeiro](https://www.linkedin.com/in/carlos-gabriel-ribeiro0)
