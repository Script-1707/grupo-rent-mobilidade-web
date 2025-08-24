# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0faefd93-6643-4581-aeaa-b84bd03df094

# Grupo Rent Mobilidade (frontend)

Este repositório contém a aplicação web (Vite + React + TypeScript) usada pelo projeto Grupo Rent Mobilidade.

## Objetivo deste README
Passos mínimos para configurar o ambiente de desenvolvimento, incluindo Prisma (gerar client, aplicar schema/migrations e rodar seed). Comandos pensados para PowerShell no Windows.

> Observação: o projeto usa `type: "module"` no `package.json`. O seed script já foi adaptado para ESM (`prisma/seed.js`).

## Requisitos
- Node.js (v18+ recomendado)
- npm
- Acesso ao banco de dados MySQL configurado em `.env` (variável `DATABASE_URL`)

## Passos de setup (PowerShell)
1. Instalar dependências

```powershell
cd C:\\laragon\\www\\grupo-rent-mobilidade-web
npm install
```

2. Gerar Prisma Client

```powershell
npx prisma generate
# ou: npm run prisma:generate
```

3. Aplicar schema / migrations

Existem duas abordagens dependendo das permissões do usuário do banco:

Opção A — (preferível quando o usuário do DB tem permissões para criar bancos)
- Use o fluxo de migrations (mantém histórico de alterações):

```powershell
npx prisma migrate dev --name init
# ou: npm run prisma:migrate
```

Se ocorrer um erro sobre criação do _shadow database_ (P3014 / P1010), é porque o usuário do MySQL não tem permissão para criar bancos. Neste caso veja as alternativas abaixo.

Opção B — (workaround rápido, não gera histórico de migrations)
- Sincroniza o schema diretamente com o banco (cria/atualiza tabelas conforme `schema.prisma`) sem gerar arquivos de migrations:

```powershell
npx prisma db push
```

Use esta opção para desenvolvimento rápido ou quando não for possível conceder permissões ao usuário do banco.

Opção C — usar `shadowDatabaseUrl` (avançado)
- Crie um banco que o usuário possa usar como shadow DB e adicione no `.env`:

```
SHADOW_DATABASE_URL="mysql://user:pass@host:port/shadow_db"
```

- Em `prisma/schema.prisma` adicione `shadowDatabaseUrl = env("SHADOW_DATABASE_URL")` no bloco `datasource db`.
- Então rode `npx prisma migrate dev` novamente.

4. Rodar seed

```powershell
# após gerar o client e garantir que as tabelas existem (via migrate ou db push)
node prisma/seed.js
# ou: npm run prisma:seed
```

5. Executar a aplicação (desenvolvimento)

```powershell
npm run dev
```

## Problemas comuns
- Erro P3014 / P1010 ao rodar migrations: "could not create the shadow database" — significa que o usuário não pode criar bancos. Soluções: conceder permissão CREATE DATABASE ao usuário, usar `SHADOW_DATABASE_URL` apontando para um banco já existente, ou usar `prisma db push` como fallback.

- Seed com erro `require is not defined`: acontece em projetos ESM quando o seed usa `require`. O seed aqui foi convertido para ESM (`import`) e deve rodar com `node prisma/seed.js`.

## Scripts úteis (em `package.json`)
- `npm run dev` — roda o Vite em modo dev
- `npm run build` — build de produção
- `npm run prisma:generate` — `prisma generate`
- `npm run prisma:migrate` — `prisma migrate dev --name init`
- `npm run prisma:seed` — `node prisma/seed.js`
- `npm run prisma:studio` — `prisma studio`

## Fluxo recomendado para desenvolvimento local
1. Configurar `.env` com `DATABASE_URL`
2. `npm install`
3. `npx prisma generate`
4. Se possível: `npx prisma migrate dev --name init` (ou `db push` se não for possível)
5. `node prisma/seed.js`
6. `npm run dev`

## Notas finais
Se quiser que eu configure `shadowDatabaseUrl` automaticamente, ou que eu gere os arquivos de migration localmente com `--create-only` e te deixe as migrations no repositório, diga qual opção prefere e eu faço as alterações.
