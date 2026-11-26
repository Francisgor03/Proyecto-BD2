import { Menu, RefreshCw } from 'lucide-react';

export function TopBar({ title, onOpenMobileMenu, onRefresh }: {
  title: string;
  onOpenMobileMenu: () => void;
  onRefresh: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onOpenMobileMenu} aria-label="Abrir menú"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <nav aria-label="Ubicación actual" className="truncate text-sm">
          <span className="hidden text-slate-500 sm:inline">AgroSmart / </span>
          <span className="font-semibold">{title}</span>
        </nav>
      </div>
      <button type="button" onClick={onRefresh} aria-label="Actualizar datos"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Actualizar</span>
      </button>
    </header>
  );
}
