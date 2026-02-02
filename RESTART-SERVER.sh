#!/bin/bash

echo "🔴 Matando todos los procesos Node..."
killall -9 node 2>/dev/null || true
sleep 3

echo "🧹 Limpiando caches..."
cd "/Users/lourdesalcarazmartinez/Documents/REFERRAL PB/pb-referral"
rm -rf .next node_modules/.cache .turbo

echo "🔧 Limpiando atributos extendidos..."
xattr -cr . 2>/dev/null || true

echo "🚀 Arrancando servidor..."
npm run dev
