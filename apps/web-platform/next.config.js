"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const nextConfig = {
    outputFileTracingRoot: path_1.default.join(__dirname, '../../'),
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'media.mydigisence.com' },
            { protocol: 'https', hostname: '*.cloudflare.com' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        ],
    },
};
exports.default = nextConfig;
//# sourceMappingURL=next.config.js.map