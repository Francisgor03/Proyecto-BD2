import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Database,
  Droplets,
  FileSpreadsheet,
  Layers,
  Map as MapIcon,
  Radio,
  Sprout,
  Terminal,
  X,
} from 'lucide-react';
import type { NavSectionId } from '../types/telemetry';
import { EngineBadge } from './StatusBadges';

interface SidebarProps {
  activeSection: NavSectionId;
  onSelectSection: (section: NavSectionId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  criticalCount: number;
}

interface NavItem {
  id: NavSectionId;
  label: string;
  icon: typeof Activity;
  engine?: 'ORA' | 'MDB';
  badgeCount?: number;
}

export function Sidebar({
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  criticalCount,
}: SidebarProps) {
  const consoleItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Telemetry Overview',
      icon: Activity,
      badgeCount: criticalCount > 0 ? criticalCount : undefined,
    },
  ];

  const oracleItems: NavItem[] = [
    { id: 'ora-batches', label: 'Crop Batches', icon: Sprout, engine: 'ORA' },
    { id: 'ora-irrigation', label: 'Irrigation & Valves', icon: Droplets, engine: 'ORA' },
    { id: 'ora-billing', label: 'Quotas & Billing', icon: FileSpreadsheet, engine: 'ORA' },
  ];

  const mongoItems: NavItem[] = [
    { id: 'mdb-streams', label: 'Telemetry Streams', icon: Radio, engine: 'MDB' },
    { id: 'mdb-logs', label: 'Gateway Logs', icon: Terminal, engine: 'MDB' },
    { id: 'mdb-geojson', label: 'GeoJSON Parcels', icon: MapIcon, engine: 'MDB' },
  ];

  const handleSelect = (id: NavSectionId) => {
    onSelectSection(id);
    onCloseMobile();
  };

  const renderGroup = (title: string, items: NavItem[], icon?: 'ora' | 'mdb') => (
    <div className="space-y-1">
      {!collapsed && (
        <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#64748B] uppercase">
          <span className="flex items-center gap-1.5">
            {icon === 'ora' && <Database className="h-3 w-3 text-[#475569]" aria-hidden="true" />}
            {icon === 'mdb' && <Layers className="h-3 w-3 text-[#059669]" aria-hidden="true" />}
            {title}
          </span>
        </div>
      )}
      {collapsed && <div className="my-2 border-t border-[#E2E8F0]" />}
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleSelect(item.id)}
                title={collapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] ${
                  isActive
                    ? 'bg-[#059669]/10 text-[#065F46]'
                    : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                } ${collapsed ? 'justify-center px-2' : 'justify-between'}`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? 'text-[#059669]' : 'text-[#64748B] group-hover:text-[#0F172A]'
                    }`}
                    aria-hidden="true"
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </span>
                {!collapsed && item.badgeCount !== undefined && (
                  <span className="inline-flex items-center justify-center rounded-full bg-[#FEE2E2] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#991B1B] tabular-nums">
                    {item.badgeCount}
                  </span>
                )}
                {!collapsed && item.engine && <EngineBadge engine={item.engine} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white border-r border-[#E2E8F0]">
      {/* Brand header */}
      <div className={`flex h-16 items-center border-b border-[#E2E8F0] px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#059669] text-white">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block font-display text-base font-bold tracking-tight text-[#0F172A] whitespace-nowrap">
                AgroSmart
              </span>
              <span className="block text-[11px] font-medium text-[#64748B] whitespace-nowrap">
                Precision Telemetry
              </span>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            className="hidden lg:inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation menu"
          className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation */}
      <nav aria-label="Main Telemetry Navigation" className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {renderGroup('Operations', consoleItems)}
        {renderGroup('Oracle Enterprise', oracleItems, 'ora')}
        {renderGroup('MongoDB Atlas', mongoItems, 'mdb')}
      </nav>

      {/* Footer / Collapse expand */}
      <div className="border-t border-[#E2E8F0] p-3">
        {collapsed ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="hidden lg:flex w-full h-9 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-lg bg-[#F8FAFC] px-3 py-2.5 border border-[#E2E8F0]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F172A] font-display text-xs font-bold text-white">
              FC
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[#0F172A]">Field Agronomist</p>
              <p className="truncate font-mono text-[11px] text-[#64748B]">ORA + MDB Dual-Sync</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet fixed rail */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {/* Mobile off-canvas drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[260px] max-w-[85vw] h-full shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
