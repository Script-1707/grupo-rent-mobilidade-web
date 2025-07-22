#!/bin/bash

git fetch origin
git reset --hard origin/main

# 2. (Opcional) Atualiza dependências, se o package.json mudou
npm install

# 3. Reconstrói o projeto (importante para Next.js)
npm run build

# 4. Reinicia o processo com PM2
pm2 restart evgrupo