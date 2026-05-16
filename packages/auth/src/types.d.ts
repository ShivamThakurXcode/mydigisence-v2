import type { UserRole, WorkspaceRole } from '@mydigisence/constants';
export interface JwtPayload {
    sub: string;
    email: string;
    roles: UserRole[];
    workspaceId?: string;
    workspaceRole?: WorkspaceRole;
    iat?: number;
    exp?: number;
}
export interface RefreshTokenPayload {
    sub: string;
    tokenId: string;
    iat?: number;
    exp?: number;
}
export interface EmailTokenPayload {
    sub: string;
    email: string;
    purpose: 'verify' | 'reset';
    iat?: number;
    exp?: number;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
//# sourceMappingURL=types.d.ts.map