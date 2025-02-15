
# Instruções para Execução do Projeto

## Versões Utilizadas

- **TypeORM**: 0.3.20
- **Postgres**: 17
- **Node**: 22.14.0

## Passo a Passo para Executar o Projeto

1. Execute `npm install` na versão mais recente do Node (22.14.0).

2. Configure a `.env` do projeto para conexão com o banco de dados Postgres:

   ```env
   DB_HOST=seuhost    # Geralmente, em uso local, usamos localhost
   DB_PORT=5432
   DB_USER="postgres"
   DB_PASSWORD=suasenha
   DB_NAME=seudatabase
   ```

3. Caso encontre um problema de pasta ao executar, onde a solução para executar as migrations é buildar o projeto, execute os seguintes comandos:

   ```bash
   npm tsc
   npx typeorm migration:run --dataSource dist/database/data-source.js
   ```

4. Por fim, execute o comando para iniciar o projeto:

   ```bash
   npm run start:dev
   ```
