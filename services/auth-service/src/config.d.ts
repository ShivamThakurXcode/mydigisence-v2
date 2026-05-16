export declare const config: {
    readonly port: number;
    readonly nodeEnv: "development" | "production" | "test";
    readonly jwtSecret: string;
    readonly redis: {
        readonly url: string;
        readonly password: string | undefined;
    };
    readonly email: {
        readonly provider: string;
        readonly host: string;
        readonly port: number;
        readonly user: string;
        readonly pass: string;
        readonly from: string;
        readonly fromName: string;
        readonly sendgridKey: string | undefined;
    };
    readonly appUrl: string;
    readonly corsOrigins: string[];
};
//# sourceMappingURL=config.d.ts.map