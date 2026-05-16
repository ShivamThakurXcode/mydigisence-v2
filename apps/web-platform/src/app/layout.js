"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewport = exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
require("./globals.css");
const fontSans = (0, google_1.Inter)({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});
const fontSerif = (0, google_1.Playfair_Display)({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});
const fontMono = (0, google_1.JetBrains_Mono)({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});
exports.metadata = {
    title: {
        default: 'MyDigiSence — Your Digital Presence Platform',
        template: '%s | MyDigiSence',
    },
    description: 'The unified platform for businesses, professionals, and creators to build their digital presence, manage clients, and grow their brand.',
    keywords: ['digital presence', 'business profile', 'professional portfolio', 'marketplace', 'booking'],
    authors: [{ name: 'MyDigiSence' }],
    creator: 'MyDigiSence',
    metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://mydigisence.com'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'MyDigiSence',
        title: 'MyDigiSence — Your Digital Presence Platform',
        description: 'Build your digital presence, manage clients, and grow your brand.',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@mydigisence',
    },
    robots: {
        index: true,
        follow: true,
    },
};
exports.viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f9f9fb' },
        { media: '(prefers-color-scheme: dark)', color: '#111827' },
    ],
};
function RootLayout({ children }) {
    return (<html lang="en" className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>);
}
//# sourceMappingURL=layout.js.map