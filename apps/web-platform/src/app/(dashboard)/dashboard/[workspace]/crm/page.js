"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = CRMPage;
exports.metadata = { title: 'CRM' };
const PIPELINE_STAGES = [
    { label: 'Lead', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', count: 0 },
    { label: 'Prospect', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400', count: 0 },
    { label: 'Proposal', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', count: 0 },
    { label: 'Active', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', count: 0 },
    { label: 'Churned', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', count: 0 },
];
function CRMPage() {
    return (<div className="space-y-6 max-w-6xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground mt-1">Manage contacts, leads, and client relationships.</p>
        </div>
        <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          Add Contact
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PIPELINE_STAGES.map((stage) => (<div key={stage.label} className="bg-card rounded-xl border border-border p-4 shadow-sm text-center">
            <p className="text-2xl font-bold">{stage.count}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${stage.color}`}>
              {stage.label}
            </span>
          </div>))}
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STAGES.map((stage) => (<div key={stage.label} className="w-64 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{stage.count}</span>
                </div>
                <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
              {/* Empty column */}
              <div className="min-h-32 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">No contacts</p>
              </div>
            </div>))}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">All Contacts</h2>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Search contacts..." className="h-8 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-48"/>
            <select className="h-8 px-2 rounded-md border border-input bg-background text-sm focus:outline-none">
              <option>All stages</option>
              {PIPELINE_STAGES.map((s) => <option key={s.label}>{s.label}</option>)}
            </select>
          </div>
        </div>
        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-4xl mb-3">👥</p>
          <p className="font-medium">No contacts yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first contact or import from CSV to get started.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Add Contact
            </button>
            <button className="h-9 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">
              Import CSV
            </button>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map