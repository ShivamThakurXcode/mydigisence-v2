import type { FastifyInstance } from 'fastify';
export declare function authRoutes(app: FastifyInstance): Promise<void>;
export declare function authErrorHandler(error: unknown, req: Parameters<Parameters<FastifyInstance['setErrorHandler']>[0]>[0], reply: Parameters<Parameters<FastifyInstance['setErrorHandler']>[0]>[1]): any;
//# sourceMappingURL=auth.routes.d.ts.map