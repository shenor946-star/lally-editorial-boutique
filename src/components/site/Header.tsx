import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import brandLogo from "@/assets/lally-boutique-logo.png";
import { SITE } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

import { LanguageSwitch } from "./LanguageSwitch";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={brandLogo}
      alt="LALY BOUTIQUE"
      className={cn("h-12 w-auto object-contain md:h-[3.35rem]", className)}
    />
  );
}

export function Header() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/catalog", label: t.nav.catalog },
    { to: "/about", label: t.nav.about },
  ] as const;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-5 md:px-10">
          <Link to="/" aria-label="LALLY BOUTIQUE" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: true }}
                className="group relative py-2 type-eyebrow"
                activeProps={{ "aria-current": "page" }}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-6">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 type-eyebrow tracking-[0.14em] lg:flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              {SITE.phoneDisplay}
            </a>
            <LanguageSwitch />
            <a
              href={whatsappLink(t.wa.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t.nav.close : t.nav.menu}
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background px-6 pb-10 pt-[calc(var(--header-h)+2.5rem)] transition-[opacity,visibility] duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              tabIndex={open ? 0 : -1}
              className={cn(
                "flex items-baseline gap-4 border-b border-border py-4 font-serif text-5xl transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
            >
              <span className="type-eyebrow text-muted-foreground">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3 text-sm">
          <p className="type-eyebrow text-muted-foreground">{t.address}</p>
          <a href={SITE.phoneHref} tabIndex={open ? 0 : -1} className="block font-serif text-3xl">
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
