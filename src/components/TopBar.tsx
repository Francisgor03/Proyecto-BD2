import { Menu, Plus } from 'lucide-react';
import type { NavSectionId } from '../types/telemetry';

interface TopBarProps {
  activeSection: NavSectionId;
  onOpenMobileMenu: () => void;
  onOpenRegisterSensor: () => void;
}

const SECTION_BREADCRUMBS: Record<NavSectionId, { group: string; page: string }> = {
  overview: { group: 'Console', page: 'Telemetry Overview' },
  'ora-batches': { group: 'Oracle Enterprise', page: 'Crop Batches & Fields' },
  'ora-irrigation': { group: 'Oracle Enterprise', page: 'Irrigation & Valves' },
  'ora-billing': { group: 'Oracle Enterprise', page: 'Quotas & Billing' },
  'mdb-streams': { group: 'MongoDB Atlas', page: 'Telemetry Streams' },
  'mdb-logs': { group: 'MongoDB Atlas', page: 'Gateway Logs' },
  'mdb-geojson': { group: 'MongoDB Atlas', page: 'GeoJSON Boundaries' },
};

export function TopBar({
  activeSection,
  onOpenMobileMenu,
  onOpenRegisterSensor,
}: TopBarProps) {
  const crumb = SECTION_BREADCRUMBS[activeSection];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#E2E8F0] bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm min-w-0">
          <span className="hidden sm:inline font-medium text-[#64748B] whitespace-nowrap">
            AgroSmart
          </span>
          <span className="hidden sm:inline text-[#CBD5E1]" aria-hidden="true">/</span>
          <span className="hidden sm:inline font-medium text-[#64748B] whitespace-nowrap">
            {crumb.group}
          </span>
          <span className="hidden sm:inline text-[#CBD5E1]" aria-hidden="true">/</span>
          <span className="font-display font-semibold text-[#0F172A] truncate">
            {crumb.page}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenRegisterSensor}
          className="inline-flex h-10 items-center gap-1.5 sm:gap-2 rounded-lg bg-[#059669] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-[#047857] active:bg-[#065F46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
        >
          <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Register Sensor</span>
          <span className="sm:hidden">Add Node</span>
        </button>
      </div>
    </header>
  );
}
