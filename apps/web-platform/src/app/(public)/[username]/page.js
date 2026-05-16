"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublicProfilePage;
async function PublicProfilePage({ params }) {
    const awaitedParams = await params;
    return <div>{awaitedParams.username}</div>;
}
//# sourceMappingURL=page.js.map