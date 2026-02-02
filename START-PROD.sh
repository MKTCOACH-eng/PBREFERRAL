#!/bin/bash

echo "🔴 Matando procesos Node..."
killall -9 node 2>/dev/null || true
sleep 2

cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"

echo "🧹 Limpiando..."
rm -rf .next node_modules/.cache .turbo

echo "🔨 Building para producción..."
npm run build

echo "🚀 Iniciando en modo producción..."
npm run start
