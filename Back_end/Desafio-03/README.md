# Desafio 3 - Cubos Academy -> Back End

## Utilização:

**_Para que seja possível rodar em qualquer servidor, utilizei sqls que inserem dados nas tabelas criadas, assim é só rodar o schema.js e o servidor que a aplicação estará pronta_**

1. É necessário rodar uma vez o node `./src/utils/schema.js`, para criação de todas as tabelas do banco de dados e a inserção do link das logos na table times
   **_Tinha feito uma table tabela que dava innerjoin com times para pegar id e o link_imagem, mas o processo ficou muito assíncrono e demorava, então mudei para tabela feita na memoria_**
2. Rodar o servidor para que o front consiga realizar o `fetch()`
3. Utilizar a mesma porta presente no .env de back, no `.env` de front para sincronizar os endpoints
4. Não adicionei no `.gitignore` o .env, o jogos.sql e o linkImagens.sql para servir de análise
