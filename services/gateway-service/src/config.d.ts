export declare const config: {
    readonly port: number;
    readonly nodeEnv: "development" | "production" | "test";
    readonly corsOrigins: string[];
    readonly services: {
        readonly auth: string;
        readonly user: string;
        readonly profile: string;
        readonly marketplace: string;
        readonly booking: string;
        readonly search: string;
        readonly ai: string;
        readonly notification: string;
        readonly websocket: string;
    };
    readonly redis: {
        readonly url: string;
        readonly password: string | undefined;
    };
};
//# sourceMappingURL=config.d.ts.map