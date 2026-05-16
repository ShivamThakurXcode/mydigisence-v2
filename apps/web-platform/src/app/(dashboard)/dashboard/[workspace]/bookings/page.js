"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = BookingsPage;
const link_1 = __importDefault(require("next/link"));
exports.metadata = { title: 'Bookings' };
const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};
const BOOKING_STATS = [
    { label: 'Upcoming', value: '—', icon: '📅' },
    { label: 'This Month', value: '—', icon: '📆' },
    { label: 'Completed', value: '—', icon: '✅' },
    { label: 'Revenue', value: '$—', icon: '💰' },
];
function BookingsPage({ params }) {
    return (<div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage your appointments and reservations.</p>
        </div>
        <div className="flex gap-3">
          <link_1.default href={`/dashboard/${params.workspace}/settings`} className="h-9 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Availability settings
          </link_1.default>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {BOOKING_STATS.map((s) => (<div key={s.label} className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>))}
      </div>

      {/* Calendar + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini calendar */}
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">May 2026</h2>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-muted transition-colors">‹</button>
              <button className="p-1 rounded hover:bg-muted transition-colors">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (<div key={`${d}-${i}`}>{d}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (<button key={d} className={`h-7 w-7 rounded-md text-xs hover:bg-muted transition-colors mx-auto ${d === 15 ? 'bg-primary text-primary-foreground' : ''}`}>
                {d}
              </button>))}
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Legend</p>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-primary"/> Today
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500"/> Confirmed
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-yellow-500"/> Pending
            </div>
          </div>
        </div>

        {/* Bookings list */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">All Bookings</h2>
            <div className="flex gap-2">
              {['All', 'Pending', 'Confirmed', 'Completed'].map((f) => (<button key={f} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${f === 'All' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>
                  {f}
                </button>))}
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">No bookings yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Set up your availability and add services to start accepting bookings from clients.
            </p>
            <link_1.default href={`/dashboard/${params.workspace}/marketplace`} className="mt-4 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center">
              Add your first service
            </link_1.default>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map