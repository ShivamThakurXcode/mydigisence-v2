"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    darkMode: 'class',
    content: [
        './src/**/*.{ts,tsx}',
        '../../packages/ui/src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'Inter', '-apple-system', 'sans-serif'],
                serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
                mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                sidebar: {
                    DEFAULT: 'var(--sidebar)',
                    foreground: 'var(--sidebar-foreground)',
                    primary: 'var(--sidebar-primary)',
                    'primary-foreground': 'var(--sidebar-primary-foreground)',
                    accent: 'var(--sidebar-accent)',
                    'accent-foreground': 'var(--sidebar-accent-foreground)',
                    border: 'var(--sidebar-border)',
                    ring: 'var(--sidebar-ring)',
                },
            },
            boxShadow: {
                '2xs': 'var(--shadow-2xs)',
                xs: 'var(--shadow-xs)',
                sm: 'var(--shadow-sm)',
                DEFAULT: 'var(--shadow)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
            },
        },
    },
    plugins: [],
};
exports.default = config;
//# sourceMappingURL=tailwind.config.js.map