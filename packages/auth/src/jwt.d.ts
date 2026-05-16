import type { JwtPayload, RefreshTokenPayload, EmailTokenPayload, TokenPair } from './types.js';
export declare function signAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
export declare function signRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string;
export declare function signEmailToken(payload: Omit<EmailTokenPayload, 'iat' | 'exp'>): string;
export declare function verifyAccessToken(token: string): JwtPayload;
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
export declare function verifyEmailToken(token: string): EmailTokenPayload;
export declare function createTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenPair;
export declare function decodeToken(token: string): JwtPayload | null;
//# sourceMappingURL=jwt.d.ts.map