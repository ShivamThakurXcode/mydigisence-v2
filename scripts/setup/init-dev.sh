#!/bin/bash
# MyDigiSence — Dev Environment Setup
# Run: bash scripts/setup/init-dev.sh

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
RESET='\033[0m'

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════╗"
echo "║     MyDigiSence — Dev Setup              ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${RESET}"

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo -e "${RED}✗ Node.js not found. Install Node.js 20+${RESET}"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}✗ Docker not found. Install Docker${RESET}"; exit 1; }

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo -e "${RED}✗ Node.js 20+ required (current: $(node -v))${RESET}"
  exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v)${RESET}"
echo -e "${GREEN}✓ Docker available${RESET}"

# Install pnpm
echo -e "\n${CYAN}Installing pnpm...${RESET}"
npm install -g pnpm@latest 2>/dev/null || npx pnpm@latest --version
echo -e "${GREEN}✓ pnpm ready${RESET}"

# Install workspace dependencies
echo -e "\n${CYAN}Installing workspace dependencies...${RESET}"
pnpm install || npx pnpm install
echo -e "${GREEN}✓ Dependencies installed${RESET}"

# Start Docker services
echo -e "\n${CYAN}Starting Docker services...${RESET}"
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
echo -e "${GREEN}✓ Docker services started${RESET}"

# Wait for MongoDB
echo -e "\n${CYAN}Waiting for MongoDB...${RESET}"
for i in {1..20}; do
  if docker exec mydigisence-mongodb mongosh --quiet --eval "db.runCommand('ping').ok" >/dev/null 2>&1; then
    echo -e "${GREEN}✓ MongoDB ready${RESET}"
    break
  fi
  sleep 2
done

# Push Prisma schema
echo -e "\n${CYAN}Pushing database schema...${RESET}"
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi
npx prisma db push --schema packages/database/prisma/schema.prisma
echo -e "${GREEN}✓ Database schema synced${RESET}"

# Done
echo -e "\n${GREEN}"
echo "╔══════════════════════════════════════════╗"
echo "║         Setup Complete! 🚀               ║"
echo "╠══════════════════════════════════════════╣"
echo "║                                          ║"
echo "║  Services:                               ║"
echo "║  • MongoDB    → localhost:27017          ║"
echo "║  • Redis      → localhost:6379           ║"
echo "║  • MailHog    → http://localhost:8025    ║"
echo "║  • Mongo UI   → http://localhost:8081    ║"
echo "║  • Redis UI   → http://localhost:8082    ║"
echo "║                                          ║"
echo "║  Start development:                      ║"
echo "║  npx pnpm --filter auth-service dev      ║"
echo "║  npx pnpm --filter gateway-service dev   ║"
echo "║  npx pnpm --filter web-platform dev      ║"
echo "║                                          ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${RESET}"
