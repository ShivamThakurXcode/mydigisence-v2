"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClient = exports.prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return client_1.PrismaClient; } });
function createPrismaClient() {
    return new client_1.PrismaClient({
        log: process.env['NODE_ENV'] === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
    });
}
// Singleton for dev to avoid exhausting DB connections with HMR
exports.prisma = globalThis.__prisma ?? createPrismaClient();
if (process.env['NODE_ENV'] !== 'production') {
    globalThis.__prisma = exports.prisma;
}
//# sourceMappingURL=index.js.map