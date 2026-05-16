"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
exports.metadata = {
    title: 'MyDigiSence — Admin',
    description: 'MyDigiSence Admin Panel',
};
function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>);
}
//# sourceMappingURL=layout.js.map