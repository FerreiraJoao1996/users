
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
   DB_USER=seuusuario
   DB_PASSWORD=suasenha
   DB_NAME=seudatabase
   ```

3. Executando Migrations

No meu caso, ocorreu um problema de pastas onde a solução foi encontrada neste link: [Stack Overflow - NestJS TypeORM Migration Error](https://stackoverflow.com/questions/72580969/nestjs-typeorm-error-during-migration-run-unable-to-open-file).

```bash
npx tsc
npx typeorm migration:show --dataSource dist/database/data-source.js  # Visualizar migrations pendentes
npx typeorm migration:revert --dataSource dist/database/data-source.js  # Reverter última migration, se necessário
npx typeorm migration:run --dataSource dist/database/data-source.js  # Executar migrations
```


4. Por fim, execute o comando para iniciar o projeto:

   ```bash
   npm run start:dev
   ```
