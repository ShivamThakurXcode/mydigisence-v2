import type { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '@mydigisence/validations';
export declare class AuthError extends Error {
    code: string;
    statusCode: number;
    constructor(code: string, message: string, statusCode?: number);
}
export declare class AuthService {
    signup(input: SignupInput): Promise<{
        id: any;
        email: any;
        message: string;
    }>;
    login(input: LoginInput): Promise<any>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    forgotPassword(input: ForgotPasswordInput): Promise<{
        message: string;
    }>;
    resetPassword(input: ResetPasswordInput): Promise<{
        message: string;
    }>;
    refreshTokens(refreshToken: string): Promise<any>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    getSession(userId: string): Promise<any>;
    private generateUsername;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map