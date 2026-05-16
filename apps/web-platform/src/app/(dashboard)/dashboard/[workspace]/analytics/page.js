"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = AnalyticsPage;
exports.metadata = { title: 'Analytics' };
const METRIC_CARDS = [
    { label: 'Profile Views', value: '—', sub: 'Last 30 days', trend: '+0%', icon: '👁️' },
    { label: 'Unique Visitors', value: '—', sub: 'Last 30 days', trend: '+0%', icon: '👤' },
    { label: 'Bookings', value: '—', sub: 'Last 30 days', trend: '+0%', icon: '📅' },
    { label: 'Conversion Rate', value: '—%', sub: 'Views → Bookings', trend: '+0%', icon: '🎯' },
    { label: 'Revenue', value: '$—', sub: 'Last 30 days', trend: '+0%', icon: '💰' },
    { label: 'Review Score', value: '—/5', sub: 'Average rating', trend: '+0', icon: '⭐' },
];
const TOP_SOURCES = ['Google Search', 'Direct Link', 'MyDigiSence Explore', 'Social Media', 'Referral'];
function AnalyticsPage({ params }) {
    return (<div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your profile performance and growth.</p>
        </div>
        <select className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {METRIC_CARDS.map((m) => (<div key={m.label} className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{m.icon}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{m.trend}</span>
            </div>
            <p className="text-3xl font-bold">{m.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
            <p className="text-xs text-muted-foreground/70">{m.sub}</p>
          </div>))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views over time */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Profile Views Over Time</h2>
          <div className="h-48 flex items-end justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-4xl mb-2">📊</p>
              <p className="text-sm">Chart will appear once you have traffic data</p>
            </div>
          </div>
        </div>

        {/* Top sources */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Top Traffic Sources</h2>
          <div className="space-y-3">
            {TOP_SOURCES.map((src, i) => (<div key={src} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm">{src}</span>
                </div>
                <span className="text-sm text-muted-foreground">—</span>
              </div>))}
          </div>
        </div>
      </div>

      {/* Geo + Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Top Locations</h2>
          <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground">
            <p className="text-3xl mb-2">🗺️</p>
            <p className="text-sm">Location data will appear here</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Device Breakdown</h2>
          <div className="space-y-3">
            {[['📱 Mobile', '—%'], ['💻 Desktop', '—%'], ['📟 Tablet', '—%']].map(([d, p]) => (<div key={d} className="flex items-center gap-3">
                <span className="text-sm w-24">{d}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}/>
                </div>
                <span className="text-sm text-muted-foreground w-8">{p}</span>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map