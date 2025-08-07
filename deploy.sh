#!/bin/bash

git fetch origin
git reset --hard origin/main

rm .env
# 1. Copia o arquivo de ambiente
cp .env.production .env
# 2. (Opcional) Atualiza dependências, se o package.json mudou
npm install

# 3. Reconstrói o projeto (importante para Next.js)
npm run build
