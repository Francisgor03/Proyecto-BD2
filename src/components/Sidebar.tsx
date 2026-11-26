import { useEffect, useState } from 'react';
import { Activity, ChevronDown, ChevronLeft, ChevronRight, Database, Layers, Sprout, X } from 'lucide-react';
import { datasets, engineNames } from '../../shared/datasets.mjs';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const groups = [
  { id: 'operations' as const, label: 'Operaciones', icon: Activity, items: [
    { id: 'overview', title: 'Resumen' }, { id: 'history', title: 'Historial por parcela' },
  ] },
  ...(['oracle', 'mongo'] as const).map((engine) => ({
    id: engine,
    label: engineNames[engine],
    icon: engine === 'oracle' ? Database : Layers,
    items: datasets.filter((item) => item.engine === engine),
  })),
];

export function Sidebar({
  activeSection, onSelectSection, collapsed, onToggleCollapse, mobileOpen, onCloseMobile,
}: SidebarProps) {
  const [expanded, setExpanded] = useState({ operations: true, oracle: false, mongo: false });

  useEffect(() => {
    const group = groups.find(({ items }) => items.some(({ id }) => id === activeSection));
    if (group) {
      setExpanded((current) => current[group.id] ? current : { ...current, [group.id]: true });
    }
  }, [activeSection]);

  function content(compact: boolean, layout: 'desktop' | 'mobile') {
    return (
      <div className="flex h-full flex-col border-r border-slate-200 bg-white">
        <div className={`flex h-16 shrink-0 items-center gap-2.5 border-b border-slate-200 px-4 ${compact ? 'justify-center' : ''}`}>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-600 text-white">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </div>
          {!compact && (
            <div className="mr-auto">
              <p className="font-display font-bold">AgroSmart</p>
              <p className="text-xs text-slate-500">Gestión agrícola</p>
            </div>
          )}
          <button type="button" onClick={onCloseMobile} aria-label="Cerrar menú"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Navegación principal" className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
          {groups.map(({ id: group, label, items, icon: Icon }) => {
            const open = !compact && expanded[group];
            const groupContainsSelection = items.some(({ id }) => id === activeSection);
            const listId = `${layout}-navigation-${group}`;

            return (
              <div key={group}>
                <button type="button" aria-expanded={open} aria-controls={listId} aria-label={label}
                  title={compact ? label : undefined}
                  onClick={() => {
                    if (compact) onToggleCollapse();
                    setExpanded((current) => ({ ...current, [group]: compact || !current[group] }));
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-semibold tracking-wide focus-visible:ring-2 focus-visible:ring-emerald-600 ${compact ? 'justify-center' : 'justify-between'} ${groupContainsSelection ? 'bg-emerald-50/70 text-emerald-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {!compact && label}
                  </span>
                  {!compact && (
                    <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? '' : '-rotate-90'}`} />
                  )}
                </button>
                <ul id={listId} hidden={!open} className="ml-5 mt-1 space-y-0.5 border-l border-slate-200 pl-2">
                  {items.map(({ id, title }) => (
                    <li key={id}>
                      <button type="button" aria-current={activeSection === id ? 'page' : undefined}
                        onClick={() => { onSelectSection(id); onCloseMobile(); }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium focus-visible:ring-2 focus-visible:ring-emerald-600 ${activeSection === id ? 'bg-emerald-100/70 text-emerald-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                        {title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="hidden border-t border-slate-200 p-3 md:block">
          <button type="button" onClick={onToggleCollapse}
            aria-label={compact ? 'Expandir menú' : 'Contraer menú'}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">
            {compact ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Contraer menú</>}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <aside className={`hidden shrink-0 md:block ${collapsed ? 'w-[72px]' : 'w-[254px]'}`}>
        <div className="sticky top-0 h-dvh">{content(collapsed, 'desktop')}</div>
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <button type="button" aria-label="Cerrar menú" onClick={onCloseMobile} className="absolute inset-0 bg-slate-900/40" />
          <div className="relative h-full w-[254px] max-w-[85vw] shadow-xl">{content(false, 'mobile')}</div>
        </div>
      )}
    </>
  );
}
