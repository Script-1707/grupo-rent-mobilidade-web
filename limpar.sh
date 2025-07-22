#!/bin/bash

# Limpar o cache do npm
echo "🧹 Limpando o cache do npm..."
npm cache clean --force

# Remover node_modules e package-lock.json
echo "🗑️ Removendo node_modules e package-lock.json..."
rm -rf node_modules package-lock.json

# Instalar versão específica do esbuild com --legacy-peer-deps
echo "📦 Instalando esbuild@0.25.0 com --legacy-peer-deps..."
npm install esbuild@0.25.0 --legacy-peer-deps

# Instalar dependências restantes do projeto
echo "📥 Instalando dependências do projeto..."
npm install

echo "✅ Processo concluído."

