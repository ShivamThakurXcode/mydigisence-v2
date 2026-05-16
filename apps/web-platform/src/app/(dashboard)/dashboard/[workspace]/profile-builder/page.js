"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = ProfileBuilderPage;
exports.metadata = { title: 'Profile Builder' };
const SECTION_REGISTRY = [
    { type: 'hero', label: 'Hero', desc: 'Headline, subheadline, CTA button and background', emoji: '🎯', enabled: true },
    { type: 'about', label: 'About', desc: 'Bio, story, and key highlights', emoji: '👤', enabled: true },
    { type: 'services', label: 'Services', desc: 'Your offered services with pricing', emoji: '⚙️', enabled: false },
    { type: 'products', label: 'Products', desc: 'Physical or digital products for sale', emoji: '📦', enabled: false },
    { type: 'pricing', label: 'Pricing', desc: 'Pricing tiers and packages', emoji: '💰', enabled: false },
    { type: 'gallery', label: 'Gallery', desc: 'Photo and video gallery', emoji: '🖼️', enabled: false },
    { type: 'reviews', label: 'Reviews', desc: 'Customer reviews and testimonials', emoji: '⭐', enabled: true },
    { type: 'skills', label: 'Skills', desc: 'Skill tags and proficiency levels', emoji: '🎯', enabled: false },
    { type: 'experience', label: 'Experience', desc: 'Work history and achievements', emoji: '📋', enabled: false },
    { type: 'projects', label: 'Projects', desc: 'Portfolio projects with links and images', emoji: '🚀', enabled: false },
    { type: 'booking', label: 'Booking', desc: 'Embed your booking calendar', emoji: '📅', enabled: false },
    { type: 'faqs', label: 'FAQs', desc: 'Frequently asked questions', emoji: '❓', enabled: false },
    { type: 'contact', label: 'Contact', desc: 'Contact form and social links', emoji: '📬', enabled: true },
];
function ProfileBuilderPage({ params }) {
    return (<div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Builder</h1>
          <p className="text-muted-foreground mt-1">
            Manage sections, reorder them, and customize content. Changes save automatically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href={`/workspace/${params.workspace}`} target="_blank" className="h-9 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Preview
          </a>
          <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Two columns: sections list + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Manager */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Profile Sections</h2>
            <span className="text-xs text-muted-foreground">
              {SECTION_REGISTRY.filter((s) => s.enabled).length} active
            </span>
          </div>
          <div className="space-y-2">
            {SECTION_REGISTRY.map((section, idx) => (<div key={section.type} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${section.enabled ? 'border-border bg-card' : 'border-dashed border-border/50 bg-muted/20 opacity-60'}`}>
                {/* Drag handle */}
                <div className="text-muted-foreground/40 cursor-grab select-none">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16"/>
                  </svg>
                </div>
                {/* Order badge */}
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </div>
                {/* Icon + info */}
                <span className="text-xl">{section.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{section.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{section.desc}</p>
                </div>
                {/* Toggle */}
                <button className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${section.enabled ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${section.enabled ? 'translate-x-4.5' : 'translate-x-0.5'}`}/>
                </button>
                {/* Edit button */}
                {section.enabled && (<button className="h-8 w-8 rounded-md border border-border hover:bg-muted flex items-center justify-center transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>)}
              </div>))}
          </div>
        </div>

        {/* Profile Preview Panel */}
        <div className="space-y-3">
          <h2 className="font-semibold">Live Preview</h2>
          <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
            {/* Mock browser bar */}
            <div className="bg-muted border-b border-border px-3 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"/>
                <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                <div className="w-3 h-3 rounded-full bg-green-400"/>
              </div>
              <div className="flex-1 bg-background rounded text-xs px-2 py-1 text-muted-foreground truncate">
                mydigisence.com/workspace/{params.workspace}
              </div>
            </div>
            {/* Mock profile */}
            <div className="p-4 space-y-4">
              <div className="h-20 rounded-lg bg-sidebar/20 flex items-end px-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-primary mb-[-24px] border-2 border-background"/>
              </div>
              <div className="pt-6 space-y-1">
                <div className="h-4 w-32 bg-muted rounded"/>
                <div className="h-3 w-24 bg-muted/60 rounded"/>
              </div>
              {SECTION_REGISTRY.filter((s) => s.enabled).map((s) => (<div key={s.type} className="space-y-1.5">
                  <div className="h-3 w-20 bg-muted rounded"/>
                  <div className="h-12 bg-muted/40 rounded"/>
                </div>))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Full preview opens in new tab
          </p>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map