"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const link_1 = __importDefault(require("next/link"));
function HomePage() {
    return (<main className="px-6 py-12 max-w-5xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Mydigisence — Digital Presence Profile</h1>
        <p className="text-lg text-muted-foreground mb-6">Build and share professional profiles, workspaces, and AI-powered presence.</p>

        <div className="flex gap-4 justify-center">
          <link_1.default href="/marketing" className="inline-block px-4 py-2 rounded bg-primary text-white">Explore Marketing</link_1.default>
          <link_1.default href="/dashboard" className="inline-block px-4 py-2 rounded border">Open Dashboard</link_1.default>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded">
          <h3 className="font-semibold mb-2">Profiles</h3>
          <p className="text-sm text-muted-foreground">Create public profiles and share your digital presence.</p>
        </div>
        <div className="p-6 border rounded">
          <h3 className="font-semibold mb-2">Workspaces</h3>
          <p className="text-sm text-muted-foreground">Collaborate and showcase projects in dedicated workspaces.</p>
        </div>
        <div className="p-6 border rounded">
          <h3 className="font-semibold mb-2">AI Studio</h3>
          <p className="text-sm text-muted-foreground">Explore AI tools for content and profile optimization.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Quick links</h2>
        <ul className="space-y-2">
          <li><link_1.default href="/ai" className="text-primary hover:underline">AI Studio</link_1.default></li>
          <li><link_1.default href="/marketing" className="text-primary hover:underline">Marketing site</link_1.default></li>
          <li><link_1.default href="/profiles" className="text-primary hover:underline">Profiles</link_1.default></li>
          <li><link_1.default href="/dashboard" className="text-primary hover:underline">Dashboard</link_1.default></li>
        </ul>
      </section>
    </main>);
}
//# sourceMappingURL=page.js.map